import { Router } from "express";
import { JwtAuthenticator } from "../middleware/authenticator";
import { getMe } from "../controller/user.controller";

const router = Router();

router.get("/", (req, res) => {
    res.send("User routes, refer to documentation for more information.");
});

router.get("/me", JwtAuthenticator, getMe);

export default router;