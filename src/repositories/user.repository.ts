import { Person } from "@/entities/person.entity";
import { User } from "@/entities/user.entity";
import { database } from "@/lib/pg/db";

export class UserRepository {
  async create({ username, password }: User): Promise<User | undefined> {
    const result = await database.clientInstance?.query(
      `INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING *`,
      [username, password]
    );
    return result?.rows[0];
  }

  public async findWithPerson(
    userid: number
  ): Promise<(User & Person) | undefined> {
    const result = await database.clientInstance?.query(
      `SELECT * FROM "user"
      LEFT JOIN person ON "user".id = person.user_id
      WHERE "user".id = $1`,
      [userid]
    );
    return result?.rows[0];
  }
}
