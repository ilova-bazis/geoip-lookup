import express, { Express, Request, Response } from 'express';

import user from './routes/user.routes';
import auth from './routes/auth.routes';
import lookup from './routes/lookup.routes';
import apikey from './routes/apikey.routes';
import { GeonameSyncService } from './services/geoname.db.updater';
import maxMindService, { MaxmindDbService } from './services/maxmind.db.service';
import { MaxmindDbUpdater } from './services/maxmind.db.updater';
import morgan from 'morgan';

import { config } from './configs/config';
import { JwtPayload } from './types/jwt.payload';

declare global {
    namespace Express {
      interface Request {
        iplookup: MaxmindDbService
        user?: JwtPayload
      }
    }
}

async function createApp(): Promise<Express> {
    const app: Express = express();

    const geonameUpdater = new GeonameSyncService();
    const updater = new MaxmindDbUpdater();
    // MARK: Initial Syncs of databases
    await geonameUpdater.initialSync()
        // .then(() => console.log('⚡️[updater]: Geoname Database updated successfully'))
        // .catch((err) => console.log(err));

    await updater.sync()
        // .then(() => console.log('⚡️[updater]: MaxMind Database updated successfully'))
        // .catch((err) => console.log(err));

    app.use(morgan("common"));

    app.use(express.json());

    // CORS
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', config.ALLOWED_ORIGINS);
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
        res.send({
            message: 'Welcome to GeoIP Lookup API',
            documentation: 'To see documentation refer to README.md on GitHub',
            version: '1.0.0'
        });
    });

    app.use('/users', user);
    app.use('/auth', auth);
    app.use('/apikey', apikey);
    app.use('/lookup', lookup);



    return app
}

export default createApp;