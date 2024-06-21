import { PrismaClient, Session, User } from "@prisma/client";
import { randomUUID } from "crypto";
const bcrypt = require('bcrypt');

export class UsersRepository {

    private prisma = new PrismaClient();

    async getAll(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }

    async getById(id: number): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    async login(email: string, password: string) {
        // console.log(email, password);
        // console.log("Logging in")
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        // console.log(user);
        if(!user) {
            console.log("user not found");
            return null

        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        // console.log("isMatch", isMatch);
        if(!isMatch) {
            return null
        }
        // console.log("ENV", process.env.SESSION_EXPIRATION_TIME, Date.now(), process.env.SESSION_EXPIRATION_TIME! + Date.now());
        const expiresAt = new Date(Date.now() + parseInt(process.env.SESSION_EXPIRATION_TIME!));
        // console.log("expiresAt", expiresAt);
        // Create session
        const session = await this.prisma.session.create({
            data: {
                userId: user.id,
                expiresAt: expiresAt,
                token: randomUUID(),
            },
            include: {
                user: true
            }
        })
        
        return session
    }

    async create(user: {email: string, password: string, firstName: string, lastName: string}): Promise<User> {

        // Hashed password
        // const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, 10);
        console.log(hashedPassword)

        return await this.prisma.user.create({
            data: {
                email: user.email,
                password: hashedPassword,
                firstName: user.firstName,
                lastName: user.lastName,
            }
        })
    }

    async getSession(id: string): Promise<Session | null> {
    return await this.prisma.session.findUnique({
            where: {
                id: id
            }
        })
    }

    async updateSession(id: string, token: string, expiresAt: Date): Promise<Session | null> {
        return await this.prisma.session.update({
            where: {
                id: id
            },
            data: {
                token,
                expiresAt
            }
        })
    }
    
}

export const userRepository = new UsersRepository();

