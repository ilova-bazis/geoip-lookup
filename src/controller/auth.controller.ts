import { RequestHandler } from "express";
import { CreateUserDto, UserDto } from "../types/dtos/user.dto";
import { TokenDto } from "../types/dtos/token.dto";
import { userRepository } from "../repository/users.repository";
import jwt from "jsonwebtoken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { config } from "../configs/config";
import { Session, User } from "@prisma/client";
import { ErrorDto } from "../types/dtos/error.dto";

// Extract the token creation logic into a separate function for better reusability
const createToken = (session: Session, user: User) => {
  const secret = config.SECRET;
  const token = jwt.sign({ ses: session.id }, secret, {
    expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRATION_TIME!),
    subject: user.id.toString(),
    algorithm: "HS256",
  });
  const refreshToken = jwt.sign({ ses: session.id, tkn: session.token }, secret, {
    expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRATION_TIME!),
    subject: user.id.toString(),
    algorithm: "HS256",
  });
  return { token, refreshToken };
};

// Signup endpoint
export const signup: RequestHandler<Record<string, any> | undefined, { user: UserDto, token: TokenDto } | ErrorDto, CreateUserDto> = async (req, res, next) => {
  try {
    const user = await userRepository.create(req.body);
    const session = await userRepository.login(req.body.email, req.body.password);
    if (!session) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const { token, refreshToken } = createToken(session, user);

    return res.send({
      token: { token, refreshToken },
      user: {
        id: "" + user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(409).send({ error: "User already exists" });
      }
    }
    return res.status(400).send({ error: "Bad request" });
  }
};

// Signin endpoint
export const signin: RequestHandler<{}, { user: UserDto, token: TokenDto } | ErrorDto, { email: string, password: string }> = async (req, res, next) => {
  try {
    const session = await userRepository.login(req.body.email, req.body.password);
    if (!session) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const { token, refreshToken } = createToken(session, session.user);

    return res.send({
      token: { token, refreshToken },
      user: {
        id: "" + session.user.id,
        email: session.user.email,
        firstName: session.user.firstName,
        lastName: session.user.lastName,
      },
    });
  } catch (err) {
    return res.status(401).send({ error: "Unauthorized" });
  }
};