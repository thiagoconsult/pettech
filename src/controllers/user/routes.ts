import { FastifyInstance } from "fastify";
import { create } from "./create";
import { findWithPerson } from "./find-with-person";

export async function userRoutes(app: FastifyInstance) {
  app.post("/user", create);
  app.get("/user/:user_id", findWithPerson);
}
