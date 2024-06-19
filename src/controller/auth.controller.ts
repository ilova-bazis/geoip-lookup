import { Request, Response, NextFunction, RequestHandler } from "express";
import { CreateUserDto, UserDto } from "../types/create.user.dto";
import { TokenDto } from "../types/token.dto";
import { validationResult } from "express-validator";
import { userRepository } from "../repository/users.repository";
import jwt from "jsonwebtoken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
// export async function signup(req: Request<CreateUserDto>, res: Response, next: NextFunction) {
//     req.
// }

export const signup: RequestHandler<Record<string, any> | undefined, {user: UserDto, token: TokenDto} | {error: any}, CreateUserDto> = async (req, res, next) => {

    try {
        const user = await userRepository.create(req.body);
        const session = await userRepository.login(req.body.email, req.body.password);
        const sessionId = session?.id;
        if(!sessionId) {
            return res.status(401).send({error: "Unauthorized"})
        }
        
        const token = jwt.sign({ses: session.id}, "secret", { expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRATION_TIME!), subject: user.id.toString(), algorithm: "HS256"});
        const refreshToken = jwt.sign({ses: session.id, tkn: session.token}, "secret", { expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRATION_TIME!), subject: user.id.toString(), algorithm: "HS256"});

        return res.send({
            token: {
                token: token,
                refreshTooken: refreshToken
            },
            user: {
                id: "" + user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        })
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(409).send({error: "User already exists"})
            }
        }
        return res.status(400).send({error: error})
    }
}

export const signin: RequestHandler<{}, {user: UserDto, token: TokenDto} | {error: string}, {email: string, password: string}> = async (req, res, next) => {

    
    try {
        const session = await userRepository.login(req.body.email, req.body.password);
        if(!session) {
            return res.status(401).send({error: "Unauthorized"})
        }
        
        
        const token = jwt.sign({ses: session.id}, "secret", { expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRATION_TIME!), subject: session.user.id.toString(), algorithm: "HS256"});
        const refreshToken = jwt.sign({ses: session.id, tkn: session.token}, "secret", { expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRATION_TIME!), subject: session.user.id.toString(), algorithm: "HS256"});

        // jwt.sign({email: req.body.email}, "secret", (err: Error, token: string) => {
        //     if(err) {
        //         return res.status(401).send({error: "Unauthorized"})
        //     }
        //     return res.send({
        //         token,
        //         user: {
        //             id: 1,
        //             email: "email",
        //             firstName: "firstName",
        //             lastName: "lastName"
        //         }
        //     })
        // })

        return res.send({
            token: {
                token: token,
                refreshTooken: refreshToken
            },
            user: {
                id: "" + session.user.id,
                email: session.user.email,
                firstName: session.user.firstName,
                lastName: session.user.lastName
            }
        })
    } catch(err) {
        return res.status(401).send({error: "Unauthorized"})
    }
}

function jwtSign(body: any): string {
    if(!body) {
        throw new Error("Body is required")
    }
    return jwt.sign({}, "secret", {algorithm: "HS256", expiresIn: "1h", subject: "1"})
}
