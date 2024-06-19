import { schedule } from 'node-cron';
import { MaxmindDbUpdater } from './maxmind.db.updater';
import maxmind, { AsnResponse, CityResponse, Reader } from 'maxmind';

export class MaxmindDbService {

    private lookup: Reader<CityResponse> | undefined = undefined;
    private asn: Reader<AsnResponse> | undefined = undefined;

    async getLookup() {
        if(this.lookup === undefined) {
            this.lookup = await maxmind.open<CityResponse>('db/GeoLite2-City.mmdb');
        }
        return this.lookup
    }

    async getAsn() {
        if(this.asn === undefined) {
            this.asn = await maxmind.open<AsnResponse>('db/GeoLite2-ASN.mmdb');
        }
        return this.asn
    }

    maxmindDbUpdater: MaxmindDbUpdater;
    constructor(updater: MaxmindDbUpdater) {
        this.maxmindDbUpdater = updater;
        schedule('0 0 * * *', () => {
            this.maxmindDbUpdater.sync();
            console.log('Database updated successfully');
            this.asn = undefined;
            this.lookup = undefined;      
        });
    }

    async ipLookup(ip: string): Promise<CityResponse & AsnResponse | null> {
        const lookup = await this.getLookup();
        const asnLookup = await this.getAsn();
        const city: CityResponse | null = lookup.get(ip);
        const asn: AsnResponse | null = asnLookup.get(ip);
        return { ...city, ...asn } as CityResponse & AsnResponse
    }
}

const maxMindService = new MaxmindDbService(new MaxmindDbUpdater());
export default maxMindService;