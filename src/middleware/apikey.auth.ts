import { NextFunction, Request, Response} from "express";

export default function apiKeyAuth(req: Request, res: Response, next: NextFunction): void {
    const apikey = req.query.apikey;
    if(!apikey) {
        res.status(401).send({error: "Unauthorized"})
        return
    }
    next();
}