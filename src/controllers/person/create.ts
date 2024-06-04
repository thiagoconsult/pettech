import { PersonRepository } from "@/repositories/person.repository";
import { CreatePersonUseCase } from "@/use-cases/create-person";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    cpf: z.string(),
    name: z.string(),
    birth: z.coerce.date(),
    email: z.string().email(),
  });

  const { cpf, name, birth, email } = registerBodySchema.parse(req.body);

  try {
    const personRepository = new PersonRepository();
    const createPersonUseCase = new CreatePersonUseCase(personRepository);

    const result = await createPersonUseCase.handler({
      cpf,
      name,
      birth,
      email,
    });

    return reply.status(201).send(result);
  } catch (error) {
    console.error(error);
    throw new Error("Internal Error");
  }
}