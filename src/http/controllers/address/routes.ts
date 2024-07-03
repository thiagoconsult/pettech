import { FastifyInstance } from "fastify";
import { create } from "./create";
import { find } from "./find";

export async function addressRoutes(app: FastifyInstance) {
  app.get("/address/person/:personId", find);
  app.post("/address", create);
}
