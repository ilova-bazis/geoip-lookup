/**
 * UsersRepository class that handles user-related database operations.
 */
import { PrismaClient, Session, User } from "@prisma/client";
import { randomUUID } from "crypto";
import bcrypt from 'bcrypt';

/**
 * UsersRepository class.
 */
export class UsersRepository {
    /**
     * Prisma client instance.
     */
    private prisma = new PrismaClient();

    /**
     * Number of salt rounds for password hashing.
     */
    private saltRounds = 10;

    /**
     * Retrieves all users from the database.
     * @returns A promise that resolves to an array of User objects.
     */
    async getAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    /**
     * Retrieves a user by ID from the database.
     * @param id The ID of the user to retrieve.
     * @returns A promise that resolves to a User object or null if not found.
     */
    async getById(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    /**
     * Logs in a user and returns a session object.
     * @param email The email of the user to log in.
     * @param password The password of the user to log in.
     * @returns A promise that resolves to a Session object or null if login fails.
     */
    async login(email: string, password: string): Promise<Session & { user: User } | null> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        const expiresAt = new Date(Date.now() + parseInt(process.env.SESSION_EXPIRATION_TIME!));
        const session = await this.prisma.session.create({
            data: {
                userId: user.id,
                expiresAt,
                token: randomUUID(),
            },
            include: { user: true }
        });

        return session;
    }

    /**
     * Creates a new user in the database.
     * @param user The user data to create.
     * @returns A promise that resolves to a User object.
     */
    async create(user: { email: string, password: string, firstName: string, lastName: string }): Promise<User> {
        const hashedPassword = await bcrypt.hash(user.password, this.saltRounds);
        return this.prisma.user.create({
            data: {
                email: user.email,
                password: hashedPassword,
                firstName: user.firstName,
                lastName: user.lastName,
            }
        });
    }

    /**
     * Retrieves a session by ID from the database.
     * @param id The ID of the session to retrieve.
     * @returns A promise that resolves to a Session object or null if not found.
     */
    async getSession(id: string): Promise<Session | null> {
        return this.prisma.session.findUnique({ where: { id } });
    }

    /**
     * Updates a session in the database.
     * @param id The ID of the session to update.
     * @param token The new token for the session.
     * @param expiresAt The new expiration date for the session.
     * @returns A promise that resolves to a Session object or null if update fails.
     */
    async updateSession(id: string, token: string, expiresAt: Date): Promise<Session | null> {
        return this.prisma.session.update({
            where: { id },
            data: { token, expiresAt }
        });
    }
}

/**
 * Exported instance of the UsersRepository class.
 */
export const userRepository = new UsersRepository();