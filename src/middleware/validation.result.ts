import { validationResult } from "express-validator";

export const validationResultMiddleware = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
