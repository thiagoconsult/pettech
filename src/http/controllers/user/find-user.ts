import { Person } from "@/entities/person.entity";
import { User } from "@/entities/user.entity";
import { MakeFindWithPerson } from "@/use-cases/factory/make-find-with-person";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findUSer(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<(User & Person) | undefined> {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const findWithPersonUseCase = MakeFindWithPerson();
  const result = await findWithPersonUseCase.handler(id);

  return reply.send(result);
}
