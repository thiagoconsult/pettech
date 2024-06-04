import { User } from "@/entities/user.entity";
import { UserRepository } from "@/repositories/user.repository";
import { CreateUserUseCase } from "@/use-cases/create-user";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string(),
  });

  const { username, password } = registerBodySchema.parse(req.body);

  try {
    const userRepository = new UserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const result = await createUserUseCase.handler({ username, password });
    return reply.status(201).send(result);
  } catch (error) {
    console.error(`Error creating user: ${error}`);
    throw new Error(`Error creating user: ${error}`);
  }
}
