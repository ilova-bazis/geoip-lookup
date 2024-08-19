import { Router } from "express";
import { createUserDtoSchema, signinUserDtoSchema } from "../types/dtos/user.dto";
import { signin, signup } from "../controller/auth.controller";
import { validationResultMiddleware } from "../middleware/validation.result";


const router = Router();

router.get("/", (req, res) => {
    res.send("Auth routes, refer to README.md for more information.");
});

router.post("/signin", signinUserDtoSchema, validationResultMiddleware, signin);

router.post("/signup", createUserDtoSchema, validationResultMiddleware, signup);

export default router;