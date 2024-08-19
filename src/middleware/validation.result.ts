import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware function to validate request data using express-validator.
 * If validation fails, returns a 400 error response with error details.
 * Otherwise, calls the next middleware function.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
export const validationResultMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Return a 400 error response with error details if validation fails.
        return res.status(400).json({ errors: errors.array() });
    }
    // Call the next middleware function if validation succeeds.
    next();
}