import { makeFindByIdProductUseCase } from "@/use-cases/factory/make-find-by-id-product-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findById(request: FastifyRequest, reply: FastifyReply) {
  const registerParamsSchema = z.object({
    id: z.coerce.string(),
  });

  const { id } = registerParamsSchema.parse(request.params);

  const findByIdUseCase = makeFindByIdProductUseCase();

  const result = await findByIdUseCase.handler(id);

  return reply.status(200).send(result);
}
