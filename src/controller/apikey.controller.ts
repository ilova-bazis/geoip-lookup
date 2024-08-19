import { Request, RequestHandler} from "express";
import apikeyRepository from "../repository/apikey.repository";
import { AuthenticatedRequest } from "../types/auth.request";

/**
 * Creates a new API key for the authenticated user.
 * 
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the Express chain.
 * 
 * @returns A Promise that resolves with the newly created API key, or an error response if the key creation fails.
 */
export const createApiKey: RequestHandler = async (req, res, next) => {
    try {

        // Check if the user is authenticated
        if (!req.user) {
            // If the user is not authenticated, return a 401 Unauthorized response
            return res.status(401).send({ error: "Unauthorized" });
        }

        // Extract the user ID from the request body
        const userId = Number(req.user.sub);

        // Create a new API key for the user
        const key = await apikeyRepository.createKey(userId);

        // Return the newly created API key in the response
        return res.send({ message: "success", key });
    } catch (error) {
        // If an error occurs during key creation, return a 500 Internal Server Error response
        return res.status(500).send({ error: "Internal server error" });
    }
};

