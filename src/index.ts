import express, { Express, Request, Response } from 'express';
import dotenv  from 'dotenv';
import user from './routes/user.routes';
import auth from './routes/auth.routes';
import lookup from './routes/lookup.routes';
import apikey from './routes/apikey.routes';
import { GeonameSyncService } from './services/geoname.db.updater';
import { MaxmindDbService } from './services/maxmind.db.service';
import { MaxmindDbUpdater } from './services/maxmind.db.updater';

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

const updater = new MaxmindDbUpdater();
updater.sync().then(() => console.log('MaxMind Database updated successfully')).catch((err) => console.log(err));
app.use(express.json());

app.use((req, res, next) => {
    req.iplookup = new MaxmindDbService(updater);
    next();
})

app.get('/', (req: Request, res: Response) => {
    res.send('Good to know!');
});


app.use('/api', user);
app.use('/auth', auth);
app.use('/apikey', apikey);
app.use('/lookup', lookup);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})