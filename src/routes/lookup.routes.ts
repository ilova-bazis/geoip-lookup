import { Router } from "express";
import lookupDtoSchema, { LookupDto } from "../types/dtos/lookup.dto";
import { validationResultMiddleware } from "../middleware/validation.result";
import {ipLookup, gpsLookup } from "../controller/lookup.controller";
import { query } from "express-validator";
import apiKeyAuth from "../middleware/apikey.auth";

const router = Router();

router.get("/geo", apiKeyAuth, query("longitude").isDecimal().withMessage("Longitude is not valid"), query("latitude").isDecimal().withMessage("Latitude is not valid"), validationResultMiddleware, gpsLookup);
router.get<LookupDto>("/:ip", apiKeyAuth, lookupDtoSchema, validationResultMiddleware, ipLookup);
export default router;