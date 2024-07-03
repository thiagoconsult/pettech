import { makeCreateAddressUseCase } from "@/use-cases/factory/make-create-address-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip_code: z.string(),
    person_id: z.coerce.number(),
  });

  const { street, city, state, zip_code, person_id } = registerBodySchema.parse(
    req.body
  );

  const createAddressUseCase = makeCreateAddressUseCase();

  const result = await createAddressUseCase.handler({
    street,
    city,
    state,
    zip_code,
    person_id,
  });

  reply.status(201).send(result);
}
