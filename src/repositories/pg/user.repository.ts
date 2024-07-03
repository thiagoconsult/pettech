import { database } from "@/lib/pg/db";
import { IUserRepository } from "../user.repository.interface";
import { IUser } from "@/entities/models/user.iterface";
import { IPerson } from "@/entities/models/person.interface";

export class UserRepository implements IUserRepository {
  async findByUsername(username: string): Promise<IUser | undefined> {
    const result = await database.clientInstance?.query(
      `
      SELECT * FROM "user" WHERE "user".username = $1
      `,
      [username]
    );

    return result?.rows[0];
  }

  async create({ username, password }: IUser): Promise<IUser | undefined> {
    const result = await database.clientInstance?.query(
      `INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING *`,
      [username, password]
    );
    return result?.rows[0];
  }

  public async findWithPerson(
    userid: number
  ): Promise<(IUser & IPerson) | undefined> {
    const result = await database.clientInstance?.query(
      `SELECT * FROM "user"
      LEFT JOIN person ON "user".id = person.user_id
      WHERE "user".id = $1`,
      [userid]
    );
    return result?.rows[0];
  }
}
