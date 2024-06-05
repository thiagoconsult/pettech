import { FastifyInstance } from "fastify";
import { create } from "./create";
import { findUSer } from "./find-user";

export async function userRoutes(app: FastifyInstance) {
  app.get("/user/:id", findUSer);
  app.post("/user", create);
}
