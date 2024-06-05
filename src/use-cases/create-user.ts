import { User } from "@/entities/user.entity";
import { UserRepository } from "@/repositories/user.repository";
import { ResourseNotFoundError } from "./errors/resource-not-found-error";

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async handler(user: User): Promise<User | undefined> {
    const result = await this.userRepository.create(user);
    return result;
  }
}
