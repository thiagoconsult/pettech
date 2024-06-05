import { UserRepository } from "@/repositories/user.repository";
import { FindWithPersonUseCase } from "../find-with-person";

export function MakeFindWithPerson() {
  const userRepository = new UserRepository();
  const findWithPersonUseCase = new FindWithPersonUseCase(userRepository);
  return findWithPersonUseCase;
}
