import https from 'https';
import fs from 'fs';
import { extract} from 'tar';
import { IncomingMessage } from 'http';
import { glob } from 'glob';

export class MaxmindDbUpdater {

    _editions = ['GeoLite2-City', 'GeoLite2-ASN'];
    _url = 'https://download.maxmind.com/app/geoip_download?edition_id={edition}&suffix=tar.gz&license_key={licenseKey}';
    licenseKey = process.env.LICENSE_KEY;

    constructor() {}
    async sync() {
        // Call the function initially and set an interval for periodic downloads
        try {
            if(!this.licenseKey) {
                throw new Error('Missing license key');
            }

            for(const edition of this._editions) {
                const url = this._url.replace('{edition}', edition).replace('{licenseKey}', this.licenseKey);
                await downloadAndExtract(url, edition)
                console.log("Downloaded and extracted", edition);
                await fs.promises.copyFile('./db/' + getFolderName(edition) + '/' + edition + '.mmdb', './db/' + edition + '.mmdb');
                console.log("Copied", edition);
                const pattern = './db/' + edition + '_*';
                const folders = await glob.glob(pattern);
                console.log(folders)
                for (const folder of folders) {
                    await fs.promises.rm(folder, { recursive: true });
                }
                // await fs.promises.rm('./db/' + getFolderName(edition), { recursive: true });
               
            }
        } catch(err) {
            for(const edition of this._editions) {
                const pattern = './db/' + edition + '_*';
                const folders = await glob.glob(pattern);
                for (const folder of folders) {
                    await fs.promises.rm(folder, { recursive: true });
                }
            }
            console.log(err);
        }
    }
}

async function downloadFile(url: string): Promise<IncomingMessage> {
    const response =  new Promise<IncomingMessage>((resolve, reject) => {
        const req = https.get(url, (res: IncomingMessage) => {
            if(!res.statusCode) {
                reject(new Error(`HTTP error! status: ${res.statusCode}`));
                return;
            }
            if (res.statusCode >= 300 && res.statusCode < 400) { // Handle redirects
                const redirectUrl = res.headers.location;
                if (!redirectUrl) {
                  reject(new Error('No redirect URL found'));
                  return;
                }
                console.log('Redirect detected:', redirectUrl);
                downloadFile(redirectUrl).then(resolve).catch(reject);
                req.destroy();
                return;
            }
            if (res.statusCode !== 200) {
                reject(new Error(`HTTP error! status: ${res.statusCode}`));
                return;
            }
            resolve(res);
        });
        req.on('error', reject);
    })
    return response;
}

async function downloadAndExtract(url: string, edition: string) {
  try {
    // const response: IncomingMessage = await new Promise((resolve, reject) => {
    //   const req = https.get(url, (res) => {
        
    //     if (res.statusCode >= 300 && res.statusCode < 400) { // Handle redirects
    //         const redirectUrl = res.headers.location;
    //         if (!redirectUrl) {
    //           reject(new Error('No redirect URL found'));
    //           return;
    //         }
    //         console.log('Redirect detected:', redirectUrl);
    //         downloadAndExtract(redirectUrl).then(resolve).catch(reject);
    //         req.destroy();
    //         return;
    //       }
    //     if (res.statusCode !== 200) {
    //       reject(new Error(`HTTP error! status: ${res.statusCode}`));
    //       return;
    //     }
    //     resolve(res);
    //   });
    //   req.on('error', reject);
    // });

    const response = await downloadFile(url);

    // const filename = url.split('/').pop();  // Extract filename from URL
    const filename =  edition +'.tar.gz';
    const writeStream = fs.createWriteStream(filename);

    response.pipe(writeStream);

    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
    console.log(extract);
    await extract({ file: filename, C: './db' });

    // extractStream.on('entry', (entry: any) => {
    //   console.log('Extracting file:', entry.path);
    //   entry.on('data', (chunk: any) => {
    //     console.log('Extracted content:', chunk.toString()); // Log content here
    //   });
    // });
    // extractStream.on('end', () => {
    //   console.log('Extraction completed');
    //   fs.unlink(filename, (err) => { // Delete downloaded file after extraction
    //     if (err) console.error('Error deleting downloaded file:', err);
    //   });
    // });
  } catch (error) {
    console.error('Error downloading or extracting file:', error);
  } 
}

function getFolderName(edition: string) {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    // console.log(year, month, day);
    return `${edition}_${year}${month}${day}`;
}
