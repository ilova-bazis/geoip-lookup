import { RequestHandler, Response, Request, NextFunction } from "express";
import { IPLookupResponseDto, LookupDto } from "../types/dtos/lookup.dto";
import geonameRepository from "../repository/geoname.repository";
import { timeZoneRepository } from "../repository/timezone.repository";
import { countryRepository } from "../repository/country.repository";
import { GeoNameData } from "../types/geoname.data";

/**
 * Handles IP lookup requests.
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const ipLookup: RequestHandler<LookupDto, IPLookupResponseDto | { error: string }> = async (req, res, next) => {
    const city = await req.iplookup.ipLookup(req.params.ip);
    if (city === null) {
        return res.status(404).json({ error: "Invalid IP Address" });
    }

    let cityName = city.city?.names.en;
    if (!cityName && city.location) {
        const geoname = await geonameRepository.findNearest(city.location.longitude, city.location.latitude);
        cityName = geoname?.[0]?.name ?? "Unknown";
    }

    const timezoneData = timeZoneRepository.get(city.location?.time_zone ?? "");
    const country = countryRepository.getCountryByISO(city.country?.iso_code ?? "");

    res.json({
        city: cityName ?? "Unknown",
        country: city.country?.names.en ?? "Unknown",
        country_code: city.country?.iso_code ?? "Unknown",
        type: identifyIpType(req.params.ip),
        ip: req.params.ip,
        asn: city.autonomous_system_number ?? 0,
        org: city.autonomous_system_organization ?? "Unknown",
        capital: country?.Capital ?? "Unknown",
        continent: city.continent?.names.en ?? "Unknown",
        continent_code: city.continent?.code ?? "Unknown",
        currency: {
            code: country?.CurrencyCode ?? "Unknown",
            name: country?.CurrencyName ?? "Unknown"
        },
        latitude: city.location?.latitude ?? 0,
        longitude: city.location?.longitude ?? 0,
        region: city.subdivisions?.[0]?.names.en ?? "Unknown",
        region_code: city.subdivisions?.[0]?.iso_code ?? "Unknown",
        timezone: {
            id: timezoneData?.timeZoneId ?? "Unknown",
            offset: timezoneData?.rawOffset ?? 0,
            is_dst: false,
            current_time: getCurrentTimeWithOffset(timezoneData?.rawOffset ?? 0),
            utc: `UTC${(timezoneData?.gmtOffsetJan ?? 0) > 0 ? "+" : ""}${timezoneData?.gmtOffsetJan}`
        },
        success: true,
        isp: city.autonomous_system_organization ?? "Unknown",
    });
};

/**
 * Handles GPS lookup requests.
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const gpsLookup: RequestHandler<any, GeoNameData | { error: string }, any, { longitude: string, latitude: string }> = async (req, res, next) => {
    const longitude = parseFloat(req.query.longitude);
    const latitude = parseFloat(req.query.latitude);

    if (isNaN(longitude) || isNaN(latitude)) {
        return res.status(400).json({ error: "Invalid longitude or latitude" });
    }

    const geonameDatas = await geonameRepository.findNearest(longitude, latitude);
    if (!geonameDatas || geonameDatas.length === 0) {
        return res.status(404).json({ error: "Not found" });
    }

    const data: GeoNameData = {
        ...geonameDatas[0],
        population: Number(geonameDatas[0].population.toString()),
        id: Number(geonameDatas[0].id.toString()),
        elevation: Number(geonameDatas[0].elevation.toString()),
    };

    res.json(data);
};

/**
 * Gets the current time with a given offset.
 * @param offset - The time offset in hours
 * @returns The current time as a string in HH:MM:SS format
 */
function getCurrentTimeWithOffset(offset: number): string {
    const date = new Date(Date.now() + offset * 60 * 60 * 1000);
    return date.toISOString().substr(11, 8);
}

/**
 * Identifies the type of IP address.
 * @param ip - The IP address to identify
 * @returns The type of IP address: "ipv4", "ipv6", or "unknown"
 */
function identifyIpType(ip: string): "ipv4" | "ipv6" | "unknown" {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Regex = /^([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/;

    if (ipv4Regex.test(ip)) return "ipv4";
    if (ipv6Regex.test(ip)) return "ipv6";
    return "unknown";
}