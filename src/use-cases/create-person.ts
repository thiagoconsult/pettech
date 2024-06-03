import { Person } from "@/entities/person.entity";
import { PersonRepository } from "@/repositories/person.repository";

export class CreatePersonUseCase {
  constructor(private readonly personRepository: PersonRepository) {}

  async handler(person: Person) {
    return this.personRepository.create(person);
  }
}
