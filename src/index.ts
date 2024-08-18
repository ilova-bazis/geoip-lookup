import express, { Express, Request, Response } from 'express';
import dotenv  from 'dotenv';
import user from './routes/user.routes';
import auth from './routes/auth.routes';
import lookup from './routes/lookup.routes';
import apikey from './routes/apikey.routes';
import { GeonameSyncService } from './services/geoname.db.updater';
import maxMindService, { MaxmindDbService } from './services/maxmind.db.service';
import { MaxmindDbUpdater } from './services/maxmind.db.updater';
import morgan from 'morgan';
import axios from 'axios';
import https from 'https';

declare global {
    namespace Express {
      interface Request {
        iplookup: MaxmindDbService
      }
    }
}

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

const geonameUpdater = new GeonameSyncService();
geonameUpdater.initialSync();
// geonameUpdater.sync();
app.use(morgan('dev'));
const updater = new MaxmindDbUpdater();
updater.sync().then(() => console.log('MaxMind Database updated successfully')).catch((err) => console.log(err));
app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use((req, res, next) => {
    req.iplookup = maxMindService;
    next();
})

app.get('/', (req: Request, res: Response) => {
    res.send('Good to know!');
});


app.use('/api', user);
app.use('/auth', auth);
app.use('/apikey', apikey);
app.use('/lookup', lookup);

app.get('/test/:ip', (req: Request, res: Response) => {
    const agent = new https.Agent({ rejectUnauthorized: false, checkServerIdentity: (e, c) => { return undefined }, requestCert: false });
    const client = axios.create({ httpsAgent: agent });
    console.log("Incoming test request");
    const apikey = req.query.apikey
    if(!apikey) {
        return res.status(400).send('Missing apikey');
    }
    const ip = req.params.ip;
    if(!ip) {
        return res.status(400).send('Missing ip');
    }

    console.log(ip);
    console.log(apikey);

    client.get('https://geo.tamos.app/lookup/' + ip + '?apikey=' + apikey)
    .then((response: any) => {
        console.log("Response: ", response);
        console.log(response.data);
        res.send(response.data);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send(error);
    });

    // res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})