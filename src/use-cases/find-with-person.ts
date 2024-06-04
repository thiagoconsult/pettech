import { UserRepository } from "@/repositories/user.repository";

export class FindWithPersonUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async handler(userid: number) {
    return this.userRepository.findWithPerson(userid);
  }
}
