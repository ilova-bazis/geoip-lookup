import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { randomUUID } from "crypto";
const prisma = new PrismaClient();

export class ApiKeyRepository {

    async getKey(key: string) {
        const hashedKey = await bcrypt.hash(key, 10)
        const apiKey = prisma.apiKey.findUnique({
            where: {
                apiKeyHash: hashedKey
            }
        })
        return apiKey
    }

    async createKey(userId: number) {
        const key = randomUUID().replace(/-/g, '')
        const hashedKey = await bcrypt.hash(key, 10)
        const apiKey = prisma.apiKey.create({
            data: {
                userId: userId,
                apiKeyHash: hashedKey,
            }
        })
        return key
    }
}

const apikeyRepository = new ApiKeyRepository();
export default apikeyRepository;