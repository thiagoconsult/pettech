import { Person } from "@/entities/person.entity";
import { MakeCreatePersonUseCase } from "@/use-cases/factory/make-create-person-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function create(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<Person> {
  const registerBodySchema = z.object({
    cpf: z.string(),
    name: z.string(),
    birth: z.coerce.date(),
    email: z.string().email(),
    user_id: z.number(),
  });

  const { cpf, name, birth, email, user_id } = registerBodySchema.parse(
    req.body
  );

  const createPersonUseCase = MakeCreatePersonUseCase();

  const result = await createPersonUseCase.handler({
    cpf,
    name,
    birth,
    email,
    user_id,
  });

  return reply.status(201).send(result);
}
