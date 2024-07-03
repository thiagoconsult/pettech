import { Pool, PoolClient } from "pg";
import { env } from "@/env";

const CONFIG = {
  host: env.POSTGRES_HOST,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  port: env.POSTGRES_PORT,
};

class Database {
  private pool: Pool;
  private client: PoolClient | undefined;

  constructor() {
    this.pool = new Pool(CONFIG);
    this.connection();
  }

  private async connection() {
    try {
      this.client = await this.pool.connect();
    } catch (error) {
      console.error(`Connection database error ${error}`);
      throw new Error(`Connection database error ${error}`);
    }
  }

  get clientInstance() {
    return this.client;
  }
}

export const database = new Database();
