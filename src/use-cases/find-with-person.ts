import { Person } from "@/entities/person.entity";
import { User } from "@/entities/user.entity";
import { UserRepository } from "@/repositories/user.repository";
import { ResourseNotFoundError } from "./errors/resource-not-found-error";

export class FindWithPersonUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async handler(userid: number): Promise<(User & Person) | undefined> {
    const user = await this.userRepository.findWithPerson(userid);
    if (!user) throw new ResourseNotFoundError();
    return user;
  }
}
