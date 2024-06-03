import { Person } from "@/entities/person.entity";

export class PersonRepository {
  private persons: object[] = [];

  async create(person: Person) {
    person.id = 1;
    this.persons.push(person);
    return person;
  }
}
