import { RequestHandler, Response, Request, NextFunction } from "express";
import { IPLookupResponseDto, LookupDto } from "../types/lookup.dto";
import geonameRepository from "../repository/geoname.repository";
import { timeZoneRepository } from "../repository/timezone.repository";
import { countryRepository } from "../repository/country.repository";
import { GeoName } from "@prisma/client";
export const ipLookup = async function(req: Request<LookupDto>, res: Response<IPLookupResponseDto | { error: string }>, next: NextFunction) {

    console.log(req.params.ip);
    const city = await req.iplookup.ipLookup(req.params.ip);
    if(city === null) {
        return res.status(404).send({
            error: "Invalid IP Address"
        })
    }
    console.log(city)
    let cityName = city.city?.names.en
    if(!cityName) {
        if(city.location) {
            const geoname = await geonameRepository.findNearest(city.location.longitude, city.location.latitude);
            if(geoname && geoname.length > 0) {
                cityName = geoname[0].name;
            }
        }
    }

    const timezoneData = timeZoneRepository.get(city.location?.time_zone ?? "")
    const country = countryRepository.getCountryByISO(city.country?.iso_code ?? "")

    res.send({
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
        currency: {code: country?.CurrencyCode ?? "Unknown", name: country?.CurrencyName ?? "Unknown"},
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
    })
}

export const gpsLookup: RequestHandler<any, GeoNameData | { error: string }, any, {longitude: string, latitude: string}> = async (req, res, next) => {
    const longitude = parseFloat(req.query.longitude)
    const latitude = parseFloat(req.query.latitude)
    const geonameDatas = await geonameRepository.findNearest(longitude, latitude)
    if(geonameDatas === null) {
        return res.status(404).send({
            error: "Not found"
        })
    }
    if(geonameDatas.length === 0) {
        return res.status(404).send({
            error: "Not found"
        })
    }
    const data = {
        ...geonameDatas[0],
        population: Number(geonameDatas[0].population.toString()),
        id: Number(geonameDatas[0].id.toString()),
        elevation: Number(geonameDatas[0].elevation.toString()),}
    return res.send(data)
}

function getCurrentTimeWithOffset(offset: number): string {
    const date = new Date(Date.now() + offset * 60 * 60 * 1000);
    const hours = String(date.getUTCHours()).padStart(2, '0'); // Pad hours with leading 0
    const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Pad minutes with leading 0
    const seconds = String(date.getUTCSeconds()).padStart(2, '0'); // Pad seconds with leading 0  
    return `${hours}:${minutes}:${seconds}`
}

function identifyIpType(ip: string): "ipv4" | "ipv6" | "unknown" {
    const ipv6Regex = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/
    const ipv4Regex = /((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])/

    if(ipv6Regex.test(ip)) {
        return "ipv6"
    }
    if(ipv4Regex.test(ip)) {
        return "ipv4"
    }
    return "unknown"
}

interface GeoNameData {
    id: number
    name: string
    asciiname: string
    alternatenames: string
    latitude: number
    longitude: number
    feature_class: string
    feature_code: string
    country_code: string
    cc2: string
    admin1_code: string
    admin2_code: string
    admin3_code: string
    admin4_code: string
    population: number
    elevation: number
    dem: string
    timezone: string
    modification_date: string
}