import { TimeZoneData } from "../types/timezone.data";
import { rawData } from "../data/timezoneRawData";

/**
 * Repository class for managing time zone data.
 */
class TimeZoneRepository {
  /**
   * Mapping of time zone IDs to their corresponding data.
   */
  private timeZoneData: { [id: string]: TimeZoneData };

  /**
   * Constructs a new TimeZoneRepository instance.
   * @param timeZoneData - Initial time zone data to populate the repository.
   */
  constructor(timeZoneData: { [id: string]: TimeZoneData }) {
    this.timeZoneData = timeZoneData;
  }

  /**
   * Retrieves time zone data by ID.
   * @param id - Time zone ID to retrieve data for.
   * @returns Time zone data if found, otherwise null.
   */
  public get(id: string): TimeZoneData | null {
    return this.timeZoneData[id] || null;
  }
}


function parseTimeZoneData(data: string): { [id: string]: TimeZoneData} {
    const lines = data.split("\n");
    const timeZoneData: { [id: string]: TimeZoneData} = {};
    if (lines.length < 2 || lines[0].split("\t").length !== 5) {
        console.error("Invalid data format: Expected header with 5 tab-separated fields");
        return timeZoneData;
    }

    const headers = lines[0].split("\t");

    
    for (let i = 1; i < lines.length; i++) {
        const fields = lines[i].split("\t");
        if (fields.length !== 5) {
            console.warn(`Invalid line: Expected ${headers.length} fields, found ${fields.length}`);
            continue;
        }

        timeZoneData[fields[1]] = {
            countryCode: fields[0],
            timeZoneId: fields[1],
            gmtOffsetJan: parseFloat(fields[2]),
            dstOffsetJul: parseFloat(fields[3]),
            rawOffset: parseFloat(fields[4]),
        };
    }

    return timeZoneData;
}

const parsedData = parseTimeZoneData(rawData);

export const timeZoneRepository = new TimeZoneRepository(parsedData);