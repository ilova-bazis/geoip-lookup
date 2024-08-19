import { Country, GeoName, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Repository class for handling GeoName-related database operations.
 */
export class GeoNameRepository {
    /**
     * Retrieves a country by its geoname ID.
     * @param id - The geoname ID of the country.
     * @returns A Promise that resolves to the Country object or null if not found.
     */
    async getCountryById(id: number): Promise<Country | null> {
        return prisma.country.findFirst({
            where: { geoname_id: id }
        });
    }

    /**
     * Retrieves a GeoName by its ID.
     * @param id - The ID of the GeoName.
     * @returns A Promise that resolves to the GeoName object or null if not found.
     */
    async getById(id: bigint): Promise<GeoName | null> {
        return prisma.geoName.findFirst({
            where: { id }
        });
    }

    /**
     * Finds the nearest GeoName to given coordinates.
     * @param longitude - The longitude coordinate.
     * @param latitude - The latitude coordinate.
     * @returns A Promise that resolves to an array of GeoName objects or null.
     */
    async findNearest(longitude: number, latitude: number): Promise<GeoName[] | null> {
        const scope = 1;
        const minimumLatitude = latitude - scope;
        const maximumLatitude = latitude + scope;
        const minimumLongitude = longitude - scope;
        const maximumLongitude = longitude + scope;

        return prisma.$queryRaw<GeoName[]>`
            SELECT *, point(${longitude}, ${latitude}) <@> (point(longitude, latitude)::point) as distance 
            FROM geonames 
            WHERE latitude > ${minimumLatitude} AND latitude < ${maximumLatitude} 
              AND longitude > ${minimumLongitude} AND longitude < ${maximumLongitude} 
            ORDER BY distance 
            LIMIT 1
        `;
    }

    /**
     * Upserts a GeoName based on provided data.
     * @param data - The GeoName data as a tab-separated string.
     * @returns A Promise that resolves to the upserted GeoName object or null.
     */
    async upsert(data: string): Promise<GeoName | null> {
        const parsedData = this.parseData(data);
        if (!parsedData) return null;

        return prisma.geoName.upsert({
            where: { id: parsedData.id },
            update: parsedData,
            create: parsedData
        });
    }

    /**
     * Deletes a GeoName based on provided data.
     * @param data - The delete data as a tab-separated string (format: geonameId <tab> name <tab> comment).
     * @returns A Promise that resolves to the deleted GeoName object or null.
     */
    async delete(data: string): Promise<GeoName | null> {
        const fields = data.split("\t");
        const id = BigInt(fields[0]);

        if (!id) return null;

        return prisma.geoName.delete({
            where: { id }
        });
    }

    /**
     * Parses a tab-separated string into a GeoName object.
     * @param data - The GeoName data as a tab-separated string.
     * @returns The parsed GeoName object or null if parsing fails.
     */
    private parseData(data: string): GeoName | null {
        const fields = data.split("\t");

        if (fields.length !== 19) {
            console.error(`Invalid data format: Expected 19 fields, found ${fields.length}`);
            return null;
        }

        return {
            id: BigInt(fields[0]),
            name: fields[1],
            asciiname: fields[2],
            alternatenames: fields[3],
            latitude: parseFloat(fields[4]),
            longitude: parseFloat(fields[5]),
            feature_class: fields[6],
            feature_code: fields[7],
            country_code: fields[8],
            cc2: fields[9],
            admin1_code: fields[10],
            admin2_code: fields[11],
            admin3_code: fields[12],
            admin4_code: fields[13],
            population: BigInt(fields[14]) || BigInt(0),
            elevation: BigInt(fields[15]) || BigInt(0),
            dem: fields[16],
            timezone: fields[17],
            modification_date: fields[18],
        };
    }
}

const geonameRepository = new GeoNameRepository();
export default geonameRepository;