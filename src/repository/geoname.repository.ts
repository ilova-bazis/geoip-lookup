import { Country, GeoName, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export class GeoNameRepository {

    async getCountryById(id: number): Promise<Country | null> {
        return await prisma.country.findFirst({
            where: {
                geoname_id: id
            }
        })
    }

    async getById(id: bigint): Promise<GeoName | null> {
        return await prisma.geoName.findFirst({
            where: {
                id: id
            }
        })
    }

    async findNearest(longitude: number, latitude: number): Promise<GeoName[] | null> {
        const scope = 1
        let minimumLatitude = latitude - scope
        let maximumLatitude = latitude + scope
        let minimumLongitude = longitude - scope
        let maximumLongitude = longitude + scope
        // console.log(`SELECT id, name, asciiname, alternatenames, latitude, longitude, feature_class, feature_code, country_code, cc2, admin1_code, admin2_code, admin3_code, admin4_code, population, elevation, dem, timezone, modification_date, earth_distance(ll_to_earth(latitude, longitude), ll_to_earth(${latitude}, ${longitude})) AS distance FROM geonames WHERE latitude > ${minimumLatitude} AND latitude < ${maximumLatitude} AND longitude > ${minimumLongitude} AND longitude < ${maximumLongitude} ORDER BY distance LIMIT 1`)
        // const geoname = await prisma.$queryRaw<GeoName>`SELECT id, name, asciiname, alternatenames, latitude, longitude, feature_class, feature_code, country_code, cc2, admin1_code, admin2_code, admin3_code, admin4_code, population, elevation, dem, timezone, modification_date, earth_distance(ll_to_earth(latitude, longitude), ll_to_earth(${latitude}, ${longitude})) AS distance FROM geonames WHERE latitude > ${minimumLatitude} AND latitude < ${maximumLatitude} AND longitude > ${minimumLongitude} AND longitude < ${maximumLongitude} ORDER BY distance LIMIT 1`
        const geoname = await prisma.$queryRaw<GeoName[]>`SELECT *, point(${longitude}, ${latitude}) <@>  (point(longitude, latitude)::point) as distance FROM geonames WHERE latitude > ${minimumLatitude} AND latitude < ${maximumLatitude} AND longitude > ${minimumLongitude} AND longitude < ${maximumLongitude} ORDER BY distance LIMIT 1`
        // console.log(geoname)
        return geoname
    }

    async upsert(data: string): Promise<GeoName | null> {
        
        const geoname = await this.getById(BigInt(data.split("\t")[0]))
        if(geoname === null) {
            return await this.create(data)
        }
        else {
            return await this.update(geoname, data)
        }
        return geoname
    }

    async update(geoname: GeoName, data: string): Promise<GeoName | null> {
        // const updatedGeoname = await this.createGeoName(data)
        const updatedGeoname = this.parseData(data)
        if (updatedGeoname) {
            return await prisma.geoName.update({
                where: {
                    id: geoname.id
                },
                data: updatedGeoname
            })
        }
        return null
    }

    parseData(data: string): GeoName | null {
        const fields = data.split("\t");

        if (fields.length !== 19) {
            console.error(`Invalid data format (line:): Expected 20 fields, found ${fields.length}`);
            return null
        }
        const geoNameData: GeoName = {
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
        return geoNameData
    }

    async delete(data: string): Promise<GeoName | null> {
    
        // Parse delete data format is: geonameId <tab> name <tab> comment.

        const fields = data.split("\t");
        const id = BigInt(fields[0]);

        if (!id) {
            return null
        }

        return await prisma.geoName.delete({
            where: {
                id
            }
        })
    }



    async create(data: string): Promise<GeoName | null> {

        const geoNameData = this.parseData(data)

        if (!geoNameData) {
            return null
        }

        return await prisma.geoName.create({
            data: geoNameData
        })
    }
}

const geonameRepository = new GeoNameRepository();
export default geonameRepository;