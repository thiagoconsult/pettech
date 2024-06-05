import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { personRoutes } from "./controllers/person/routes";
import { userRoutes } from "./controllers/user/routes";
import { ZodError } from "zod";
import { env } from "process";
import { ResourseNotFoundError } from "./use-cases/errors/resource-not-found-error";

export const app = fastify();

app.register(personRoutes);
app.register(userRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ mesage: "Validation error", errors: error.format() });
  }

  if (env.NODE_ENV === "development") {
    console.log(error);
  }

  if (error instanceof ResourseNotFoundError) {
    return reply.status(404).send({ mesage: error.message });
  }

  return reply.status(500).send({ mesage: "Internal server error" });
});
