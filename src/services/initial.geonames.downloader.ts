import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
// import fetch from 'node-fetch';
import http, { IncomingMessage } from 'http';
import { Readable } from 'stream';
import { GeoName, PrismaClient } from '@prisma/client';
import { createInterface } from 'readline';
// import { Worker, isMainThread, workerData, parentPort } from 'node:worker_threads';

const prisma = new PrismaClient();

function download(url: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        http.get(url, (response) => {
            console.log(response.statusCode);
            if (response.statusCode !== 200) {
                throw new Error(`Failed to download file: ${response.statusCode}`);
            }
            console.log("File downloaded successfully");
            const fileStream = fs.createWriteStream(path.join(outputPath, 'allCountries.zip'));
            console.log("File stream created");
            response.pipe(fileStream).on('finish', () => {
                console.log('File downloaded and saved successfully');
                resolve();
            }).on('error', reject);
        }).on('error', reject);
    })
}

// Function to download the ZIP file
async function downloadZipFile(url: string, outputPath: string): Promise<void> {
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
    }
    await download(url, outputPath);
    // create folder if it doesn't exist
   
    console.log("Creating readable stream");
    const zipData = fs.readFileSync(path.join(outputPath, 'allCountries.zip'));

    const zip = new JSZip();
    await zip.loadAsync(zipData);

    // Extract the first file from the ZIP (assuming there's only one file)
    console.log("Extracting first file");
    const firstFileName = zip.file(/.+/)[0].name;

    console.log("First file name", firstFileName);
    const fileData = await zip.file(firstFileName)?.async('nodebuffer');
    console.log("File data", fileData?.byteLength);
    if (fileData) {
        const extractedFilePath = path.join(outputPath, 'extracted_file.txt');
        fs.writeFileSync(extractedFilePath, fileData);
        console.log('File extracted successfully');
    } else {
        console.error('No files found in the ZIP archive.');
    }
}

// Function to split the extracted file into multiple parts
async function splitFile(filePath: string, outputPath: string, partSize: number): Promise<void> {
    console.log("Splitting file into parts");
    console.log("File path", filePath);

    const fileStream = fs.createReadStream(filePath, 'utf-8');
    let lineCount = 0;
    let currentPartIndex = 0;
    let currentPartLines: string[] = [];
    let currentPartStream: fs.WriteStream;

    const createNewPartStream = () => {
        const partFileName = path.join(outputPath, `part_${currentPartIndex + 1}.txt`);
        currentPartStream = fs.createWriteStream(partFileName, {encoding: 'utf8', flags: 'a', autoClose: true, emitClose: true, mode: 0o666});
        currentPartLines = [];
    };

    const partFileName = path.join(outputPath, `part_${currentPartIndex + 1}.txt`);
    currentPartStream = fs.createWriteStream(partFileName, {encoding: 'utf8', flags: 'a', autoClose: true, emitClose: true, mode: 0o666});
    currentPartLines = [];

    const lineReader = createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    // lineReader.on('data', (chunk: Buffer) => {
    //     const lines = chunk.toString().split('\n');
    // lineReader.on('line', (line) => {  
    for await (const line of lineReader) {
        if (line.trim().length > 0) {
            currentPartLines.push(line);
            lineCount++;

            if (lineCount % partSize === 0) {
                currentPartStream.write(currentPartLines.join('\n') + '\n');
                currentPartStream.end();
                currentPartIndex++;
                createNewPartStream();
            }
        }
    }
    // for (const line of lines) {
       
    // }
    // });

    // lineReader.on('end', () => {
    if (currentPartLines.length > 0) {
        currentPartStream.write(currentPartLines.join('\n'));
        currentPartStream.end();
    }

    console.log("Lines count", lineCount);
    console.log("Number of parts", currentPartIndex + 1);

    // Delete the original file    // Delete the downloaded ZIP file and the extracted file
    fs.unlinkSync(path.join(outputPath, 'allCountries.zip'));
    fs.unlinkSync(filePath);

    // Migrate to Prisma
    await migrateToPrisma(currentPartIndex + 1, outputPath);
    // });

    // fileStream.on('data', (chunk) => {
    //     lineReader.push(chunk);
    // });

    // fileStream.on('end', () => {
    //     lineReader.push(null);
    // });
}

export default function syncGeonames(cb: (error: any | undefined) => void) {

    // if(isMainThread) {
    //     console.log("Running in Main Thread");
    //     const worker = new Worker(__filename, { workerData: { url: 'http://download.geonames.org/export/dump/allCountries.zip', outputPath: 'output', partSize: 1000000 } });

    //     worker.on('message', (message) => {
    //         console.log('Message from worker:', message);

    //     });
        
    //     worker.on('error', (error) => {
    //         console.error('Error from worker:', error);
    //     });
        
    //     worker.on('exit', (code) => {
    //         console.log('Worker exited with code:', code);
    //     });
        
    // }else {
        console.log("Running in Worker Thread");
        const zipFileUrl = 'http://download.geonames.org/export/dump/allCountries.zip';
        const outputPath = 'output';
        const partSize = 1000000; // Number of lines per part
    
        prisma.geoNameSyncLog.findFirst({
            where: {
                action: 'INITIAL'
            }
        }).then((data) => {
            if(data) {
                console.log("Already synced");
                return;
            }
            const startTime = Date.now();
            console.log("Start Time", startTime);
            // Download the ZIP file and extract the first file
            downloadZipFile(zipFileUrl, outputPath)
                .then(async () => {
                    const extractedFilePath = path.join(outputPath, 'extracted_file.txt');
        
                    // Split the extracted file into multiple parts
                    await splitFile(extractedFilePath, outputPath, partSize);
        
                    const endTime = Date.now();
                    console.log("End Time", endTime);
                    console.log("Total Time", endTime - startTime);
                    await prisma.geoNameSyncLog.create({
                        data: {
                            action: 'INITIAL',
                            url: zipFileUrl,
                            filename: 'allCountries.zip',
                            error: null
                        }
                    })
                    cb(null);
                })
                .catch((error) => {
                    // parentPort?.postMessage(error);
                    console.error('Error:', error);
                    cb(error);
                    process.exit(1);
                    
                });
        }).catch((error) => {
            // parentPort?.postMessage(error);
            console.error('Error:', error);
            cb(error);
            process.exit(1);
        });

    // }

    // Example usage

}

async function migrateToPrisma(parts: number, outputPath: string) { // parts is number of parts that were created

    console.log("Migrating to Prisma using parts", parts);
    let promises: Promise<void>[] = [];
    for(let i = 1; i <= parts; i++) {
    
        const readableStream = fs.createReadStream( path.join(outputPath, `./part_${i}.txt`), { encoding: 'utf8' });
    
        // promises.push((async() => {
           
        // })());
        try {
            await parseGeoNameDataStream(readableStream);
            // fs.unlinkSync(path.join(outputPath, `./part_${i}.txt`));
        } catch (error) {
            console.error("Error parsing geonames data:", error);
            // fs.unlinkSync(path.join(outputPath, `./part_${i}.txt`));
        }
        
        // parseGeoNameDataStream(readableStream).then (() => {
        //     console.log("Parsed GeoName Data:");
        //     fs.unlinkSync(path.join(outputPath, `./part_${i}.txt`));
        // }).catch(error => {
        //     console.error("Error parsing geonames data:", error);
        //     fs.unlinkSync(path.join(outputPath, `./part_${i}.txt`));
        // });
    }
    // await Promise.all(promises);
}

async function retryChunk(lines: string[] ) {
    console.log("Queued for retrying chunk");
    setTimeout(async () => {
        await createMany(lines);
    }, 120000);
}

async function parseGeoNameDataStream(readableStream: Readable): Promise<void> {
    let lines: string[] = [];
    try {
        const rl = createInterface({
            input: readableStream,
            crlfDelay: Infinity
        });
        
        let lineCount = 0;
        for await (const line of rl) {
            // if (line.trim() === "") {
            //     continue;
            // }
            lineCount++;
            lines.push(line);

            if (lineCount % 100000 === 0) {
                try {
                console.log(`Line ${lineCount}`);
                await createMany(lines);
                lines = [];
                } catch (error) {
                    console.error("Error creating geonames data:", error);
                    retryChunk([...lines]);
                    lines = [];
                }
            }
        }
        if(lines.length > 0) {
            await createMany(lines);
        }
    } catch (error) {
        
        console.error("Error parsing geonames data:", error);
    }
}

async function createMany(lines: string[]) {
    let geonames: GeoName[] = [];
    for(const line of lines) {
        const fields = line.split("\t");

        if (fields.length !== 19) {
            console.error(`Invalid data format (line:): Expected 19 fields, found ${fields.length}`);
            console.log(line)
            return null;
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

        geonames.push(geoNameData);
    }

    await prisma.geoName.createMany({ data: geonames, skipDuplicates: true });
}