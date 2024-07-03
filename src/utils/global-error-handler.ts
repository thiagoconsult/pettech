import { ResourseNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { env } from "@/env";
import { ZodError } from "zod";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

interface ErrorHandlerMap {
  [key: string]: (
    error: Error | ZodError,
    request: FastifyRequest,
    reply: FastifyReply
  ) => void;
}

export const errorHandlerMap: ErrorHandlerMap = {
  ZodError: (error, _, reply) => {
    reply.status(400).send({
      mesage: "Validation error",
      ...(error instanceof ZodError && { error: error.format() }),
    });
  },
  ResourseNotFoundError: (error, _, reply) => {
    reply.status(404).send({ mesage: error.message });
  },
  InvalidCredentialsError: (error, _, reply) => {
    reply.status(404).send({ message: error.message });
  },
};

export function globalErrorHandler(
  error: Error,
  _: FastifyRequest,
  reply: FastifyReply
) {
  const handler = errorHandlerMap[error.constructor.name];

  if (handler) return handler(error, _, reply);

  if (env.NODE_ENV === "development") {
    console.error(error);
  }

  return reply.status(500).send({ mesage: "Internal server error" });
}
