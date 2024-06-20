import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const JwtAuthenticator = (req: Request, res: Response, next: NextFunction) => {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if(!secret) {
        throw new Error("ACCESS_TOKEN_SECRET is not defined")
    }
    const token = extractBearerToken(req);
    if(token) {
        const result = verifyToken(token);
        if(result) {
            jwt.verify(token, secret, (err, decoded) => {
                if(err) {
                    return res.status(401).send({error: "Unauthorized"})
                }
                console.log(decoded);
                req.body.user = decoded;
            })
            next();
        } else {
            res.status(401).send({error: "Unauthorized"})
        }
    } else {
        res.status(401).send({error: "Unauthorized"})
    }
}

function extractBearerToken(req: Request) {
    return req.headers.authorization?.replace("Bearer ", "");
}

function verifyToken(token: string) {
    return true;
}