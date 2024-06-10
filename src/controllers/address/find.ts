import { makeFindAddressByPersonUseCase } from "@/use-cases/factory/make-find-address-by-person-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function find(request: FastifyRequest, reply: FastifyReply) {
  const registerParamsSchema = z.object({
    personId: z.coerce.number(),
  });
  const registerQuerySchema = z.object({
    page: z.coerce.number(),
    limit: z.coerce.number(),
  });

  const { personId } = registerParamsSchema.parse(request.params);
  const { page, limit } = registerQuerySchema.parse(request.query);

  const findAddressByPerson = makeFindAddressByPersonUseCase();

  const result = await findAddressByPerson.handler(personId, page, limit);

  reply.status(200).send(result);
}
