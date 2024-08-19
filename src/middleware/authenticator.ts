import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../configs/config";
/**
 * Middleware that verifies the JWT token in the request headers
 * @param req The request object
 * @param res The response object
 * @param next The next function to call in the middleware chain
 */
export const JwtAuthenticator = (req: Request, res: Response, next: NextFunction) => {
    // Get the secret from the environment variable
    const secret = config.SECRET;
    if (!secret) {
        throw new Error("ACCESS_TOKEN_SECRET is not defined")
    }

    // Extract the token from the request headers
    const token = extractBearerToken(req);
    if (!token) {
        return res.status(401).send({ error: "Unauthorized" });
    }

    // Verify the token using the secret
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: "Unauthorized" });
        }

        // Add the decoded token to the request body
        (req as any).user = decoded;
        next();
    });
};

/**
 * Helper function that extracts the token from the request headers
 * @param req The request object
 * @returns The token string, or undefined if not found
 */
function extractBearerToken(req: Request) {
    return req.headers.authorization?.replace("Bearer ", "");
}