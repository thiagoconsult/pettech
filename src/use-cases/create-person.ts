import { IPerson } from "@/entities/models/person.interface";
import { IPersonRepository } from "@/repositories/person.repository.interface";

export class CreatePersonUseCase {
  constructor(private readonly personRepository: IPersonRepository) {}

  async handler(person: IPerson) {
    return this.personRepository.create(person);
  }
}
