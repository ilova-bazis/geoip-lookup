import { checkSchema, body } from "express-validator";

export interface CreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface UserDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

export const createUserDtoValidation = [
    body("email", "Email must be valid").isEmail(),
    body("password", "Password must be valid").isString(),
    body("firstName", "First name must be valid").isString(),
    body("lastName", "Last name must be valid").isString()
]

export const signinUserDtoSchema = checkSchema({
    email: {
        in: ["body"],
        isEmail: true,
        errorMessage: "Email must be valid"
    },
    password: {
        in: ["body"],
        isString: true,
        errorMessage: "Password must be valid"
    },
})

export const createUserDtoSchema = checkSchema({
    email: {
        in: ["body"],
        isEmail: true,
        errorMessage: "Email must be valid"
    },
    password: {
        in: ["body"],
        isString: true,
        errorMessage: "Password must be valid"
    },
    firstName: {
        in: ["body"],
        isString: true,
        errorMessage: "First name must be valid"
    },
    lastName: {
        in: ["body"],
        isString: true,
        errorMessage: "Last name must be valid"
    },
})