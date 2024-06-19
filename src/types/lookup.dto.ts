import { param } from "express-validator";

const lookupDtoSchema = [
    param('ip', 'Invalid IP Address').isIP(),
];

export default lookupDtoSchema

export interface LookupDto extends Record<string, any> {
    ip: string
}

export interface IPLookupResponseDto {
    ip: string; // Check
    success: boolean; // Check
    type: string; // Check
    continent: string; // Check
    continent_code: string; // Check
    country: string; // Check
    country_code: string; // Check
    region: string; // Check
    region_code: string; // Check
    city: string; // Check
    latitude: number; // Check
    longitude: number; // Check
    // is_eu: boolean;
    // postal: string; // Not yet
    // calling_code: string; // Not yet
    capital: string; // Check
    // borders: string; // Not yet
    // flag: { [key: string]: string }; // Not yet
    // img: string; // Not yet
    // emoji: string; // Not yet
    // emoji_unicode: string; // Not yet
    // connection: { [key: string]: string }; // Not yet
    asn: number; // Check different db
    org: string; // Check
    isp: string; // Check
    // domain: string; // Not yet
    timezone: { 
      id: string; // Check
    //   abbr: string; // Not yet
      is_dst: boolean; // Check
      offset: number; // Check
      utc: string; // Check
      current_time: string; // Check
    };
    currency: { 
      name: string; // Check
      code: string; // Check
    //   symbol: string; // Not yet
    //   plural: string; // Not yet
    //   exchange_rate: number; // Not yet
    };
  }