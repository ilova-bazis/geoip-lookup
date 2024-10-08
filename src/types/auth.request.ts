import { JwtPayload } from "./jwt.payload";

export interface AuthenticatedRequest extends Request {
    user: JwtPayload;
}