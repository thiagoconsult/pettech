import { Person } from "@/entities/person.entity";
import { User } from "@/entities/user.entity";
import { UserRepository } from "@/repositories/user.repository";
import { FindWithPersonUseCase } from "@/use-cases/find-with-person";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findWithPerson(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<(User & Person) | undefined> {
  const registerBodySchema = z.object({
    user_id: z.coerce.number(),
  });

  const { user_id } = registerBodySchema.parse(req.params);
  try {
    const userRepository = new UserRepository();
    const findWithPersonUseCase = new FindWithPersonUseCase(userRepository);
    const result = await findWithPersonUseCase.handler(user_id);

    return reply.send(result);
  } catch (error) {
    console.error(`Error search user with person: ${error}`);
    throw new Error(`Error search user with person: ${error}`);
  }
  return;
}
