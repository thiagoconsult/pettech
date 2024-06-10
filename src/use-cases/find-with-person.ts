import { IUser } from "@/entities/models/user.iterface";
import { ResourseNotFoundError } from "./errors/resource-not-found-error";
import { IUserRepository } from "@/repositories/user.repository.interface";
import { IPerson } from "@/entities/models/person.interface";

export class FindWithPersonUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async handler(userid: number): Promise<(IUser & IPerson) | undefined> {
    const user = await this.userRepository.findWithPerson(userid);
    if (!user) throw new ResourseNotFoundError();
    return user;
  }
}
