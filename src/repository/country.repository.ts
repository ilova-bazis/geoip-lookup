import { CountryData } from "../types/country.data";
import { rawData } from "../data/countryRawData";
/**
 * Repository for country data.
 */
class CountryRepository {
    /**
     * Mapping of country ISO codes to country data.
     */
    data: { [key: string]: CountryData };
  
    /**
     * Constructs a new CountryRepository instance.
     * @param data - Mapping of country ISO codes to country data.
     */
    constructor(data: { [key: string]: CountryData}) {
      this.data = data;
    }
  
    /**
     * Retrieves country data by ISO code.
     * @param iso - Country ISO code.
     * @returns Country data if found, otherwise null.
     */
    getCountryByISO(iso: string): CountryData | null {
      return this.data[iso] || null;
    }
}


function extractLines(text: string): string[] {
    const lines = text.split("\n");
    return lines.filter(line => line.trim() !== "" && !line.startsWith("#"));
}

function parseCountryData(data: string): CountryData | null {

    const fields = data.split("\t");

    if (fields.length !== 19) {
        console.error(`Invalid data format: Expected 20 fields, found ${fields.length}`);
        return null;
    }

    const countryData: CountryData = {
        ISO: fields[0],
        ISO3: fields[1],
        ISONumeric: fields[2],
        fips: fields[3],
        Country: fields[4],
        Capital: fields[5],
        Area: parseInt(fields[6], 10),
        Population: parseInt(fields[7], 10),
        Continent: fields[8],
        tld: fields[9],
        CurrencyCode: fields[10],
        CurrencyName: fields[11],
        Phone: fields[12],
        PostalCodeFormat: fields[13],
        PostalCodeRegex: fields[14],
        Languages: fields[15],
        geonameid: parseInt(fields[16], 10),
        neighbours: fields[17],
        EquivalentFipsCode: fields[18],
    };

    return countryData;
}

var parsedDatas: { [key: string]: CountryData} = {};
const lines = extractLines(rawData);
for (const line of lines) {
    const parsedData = parseCountryData(line);
    if (parsedData) {
        parsedDatas[parsedData.ISO] = (parsedData);
    }
}

export const countryRepository = new CountryRepository(parsedDatas);