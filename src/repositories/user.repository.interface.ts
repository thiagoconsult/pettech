import { IPerson } from "@/entities/models/person.interface";
import { IUser } from "@/entities/models/user.iterface";

export interface IUserRepository {
  findWithPerson(userid: number): Promise<(IUser & IPerson) | undefined>;
  findByUsername(username: string): Promise<IUser | undefined>;
  create(user: IUser): Promise<IUser | undefined>;
}
