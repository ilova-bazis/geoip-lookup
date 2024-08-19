import { ApiKey, PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

/**
 * Repository for managing API keys.
 */
export class ApiKeyRepository {
  /**
   * Retrieves an API key by its hashed value.
   * 
   * @param key The API key to retrieve.
   * @returns The API key if found, or null otherwise.
   */
  async getKey(key: string): Promise<ApiKey | null> {
    const hashedKey = await this.hashKey(key);
    return prisma.apiKey.findUnique({ where: { apiKeyHash: hashedKey } });
  }

  /**
   * Creates a new API key for the given user.
   * 
   * @param userId The ID of the user to create the key for.
   * @returns The newly created API key.
   */
  async createKey(userId: number): Promise<string> {
    const key = this.generateKey();
    const hashedKey = await this.hashKey(key);
    await prisma.apiKey.create({ data: { userId, apiKeyHash: hashedKey } });
    return key;
  }

  /**
   * Generates a new random API key.
   * 
   * @returns A new random API key.
   */
  private generateKey(): string {
    return randomUUID().replace(/-/g, '');
  }

  /**
   * Hashes an API key using bcrypt.
   * 
   * @param key The API key to hash.
   * @returns The hashed API key.
   */
  private async hashKey(key: string): Promise<string> {
    return await bcrypt.hash(key, 10);
  }
}

const apikeyRepository = new ApiKeyRepository();
export default apikeyRepository;