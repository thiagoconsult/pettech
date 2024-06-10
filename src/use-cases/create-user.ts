import { IUser } from "@/entities/models/user.iterface";
import { IUserRepository } from "@/repositories/user.repository.interface";

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async handler(user: IUser): Promise<IUser | undefined> {
    const result = await this.userRepository.create(user);
    return result;
  }
}
