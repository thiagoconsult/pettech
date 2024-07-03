import { FastifyInstance } from "fastify";
import { create } from "./create";
import { findUSer } from "./find-user";
import { signin } from "./signin";

export async function userRoutes(app: FastifyInstance) {
  app.get("/user/:id", findUSer);
  app.post("/user/signin", signin);
  app.post("/user", create);
}
