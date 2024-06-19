import { RequestHandler } from "express";
import apikeyRepository from "../repository/apikey.repository";

export const createApiKey: RequestHandler = async (req, res, next) => {
    console.log(req.body.user)
    const key = await apikeyRepository.createKey(req.body.user.sub)
    if(!key) {
        return res.status(500).send({ error: "Internal server error" })
    }
    return res.send({ message: "success", key: key })
}