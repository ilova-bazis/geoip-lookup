import  {schedule } from 'node-cron';
// import https from 'https';
import axios from 'axios';
import geonameRepository from '../repository/geoname.repository';
import { Action, PrismaClient } from '@prisma/client';
import syncGeonames from './initial.geonames.downloader';

export class GeonameSyncService {

    client: PrismaClient = new PrismaClient();
    constructor() {
        schedule('0 0 * * *', () => {
            this.sync();
        });
    }

    async sync() {
        // TODO
        await this.update();
        await this.delete();
    }

    private async log(action: Action, url: string, filename: string, error?: string): Promise<void> {
        
        // console.log(`Syncing ${action}, url: ${url}, filename: ${filename}, error: ${error}`);
        await this.client.geoNameSyncLog.create({
            data: {
                action: action,
                url: url,
                filename: filename,
                error: error
            }
        })
    }

    async initialSync(): Promise<void> {
        
        return new Promise((resolve, reject) => {
            syncGeonames((error) => {
                if(error) {
                    console.error(error);
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        })


    }

    private async update() {
        const url = this.getUrl('update');

        const axreq = await axios.get(url);
        if (axreq.status !== 200) {
            await this.log(Action.UPDATE, url, this.getFilename('update'), axreq.statusText);
            return;
        }
        axreq.data.toString().split('\n').forEach(async (line: string) => {
            await geonameRepository.upsert(line);
        })
        await this.log(Action.UPDATE, url, this.getFilename('update'));
        
        // const req = https.request(url, (res) => {
        //     console.log(`statusCode: ${res.statusCode}`);
            
        //     res.on('data', async (d) => {
        //         d.toString().split('\n').forEach((line: string) => {
        //             geonameRepository.upsert(line);
        //         })
        //         await this.log(Action.UPDATE, url, this.getFilename('update'));
        //     });
        // });
        
        // req.on('error', (error) => {
        //     console.error(error);
        // });
        
        // req.end();
    }

    private async delete() {
        const url = this.getUrl('delete');

        const axreq = await axios.get(url);
        if (axreq.status !== 200) {
            await this.log(Action.DELETE, url, this.getFilename('delete'), axreq.statusText);
            return;
        }
        axreq.data.toString().split('\n').forEach(async (line: string) => {
            await geonameRepository.delete(line);
        })
        await this.log(Action.DELETE, url, this.getFilename('delete'));
        // const req = https.request(url, (res) => {
        //     console.log(`statusCode: ${res.statusCode}`);
        
        //     res.on('data', async (d) => {
        //         d.toString().split('\n').forEach((line: string) => {
        //             geonameRepository.delete(line);
        //         })
        //         await this.log(Action.DELETE, url, this.getFilename('delete'));
        //     });
        // });
        
        // req.on('error', (error) => {
        //     console.error(error);
        // });
        
        // req.end();
    }

    private getUrl(type: 'update' | 'delete'): string {
        return 'https://download.geonames.org/export/dump/' + this.getFilename(type);
    }

    private getFilename(type: 'update' | 'delete'): string {
        switch (type) {
            case 'update':
                return 'modifications-' + this.getDate() + '.txt';
            case 'delete':
                return 'deletes-' + this.getDate() + '.txt';
        }
    }

    private getDate(): string {
        const today = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

}