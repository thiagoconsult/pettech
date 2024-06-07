import { Person } from "@/entities/person.entity";
import { User } from "@/entities/user.entity";
import { ResourseNotFoundError } from "./errors/resource-not-found-error";
import { IUserRepository } from "@/repositories/user.repository.interface";

export class FindWithPersonUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async handler(userid: number): Promise<(User & Person) | undefined> {
    const user = await this.userRepository.findWithPerson(userid);
    if (!user) throw new ResourseNotFoundError();
    return user;
  }
}
