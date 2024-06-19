import { Router } from "express";
import { JwtAuthenticator } from "../middleware/authenticator";
import { createApiKey } from "../controller/apikey.controller";

const router = Router();

router.post('/', JwtAuthenticator, createApiKey );

export default router;