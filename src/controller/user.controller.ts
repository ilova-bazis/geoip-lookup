import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repository/users.repository";
import { UserDto } from "../types/dtos/user.dto";
import { ErrorDto } from "../types/dtos/error.dto";

/**
 * Retrieves the currently authenticated user's information.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the Express chain.
 *
 * @returns {Promise<void>} A promise that resolves when the user information is sent in the response.
 */
export async function getMe(req: Request, res: Response<UserDto | ErrorDto>, next: NextFunction): Promise<void> {
    /**
     * Check if the user is authenticated.
     * If not, return a 401 Unauthorized response.
     */
    if (!req.user) {
        res.status(401).send({ error: "Unauthorized" });
        return 
    }
  
    /**
     * Retrieve the user's information from the database using their ID.
     */
    const userId = Number(req.user.sub);
    const user = await userRepository.getById(userId);

    if (!user) {
        res.status(404).send({ error: "User not found" });
        return
    }
  
    /**
     * Send the user's information in the response.
     */
    res.send({email: user.email, firstName: user.firstName, lastName: user.lastName, id: "" + user.id});
  }