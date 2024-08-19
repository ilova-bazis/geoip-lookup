import { NextFunction, Request, Response } from "express";

/**
 * Middleware function to authenticate API key.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
export default function apiKeyAuth(req: Request, res: Response, next: NextFunction): void {
    // Extract API key from query parameters
    const apikey: string | undefined = req.query.apikey as string;

    // Check if API key is provided
    if (!apikey) {
        // Return 401 Unauthorized response if API key is missing
        res.status(401).send({ error: "Unauthorized" });
        return;
    }

    // Call the next middleware function
    next();
}