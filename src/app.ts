import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { personRoutes } from "./controllers/person/routes";
import { userRoutes } from "./controllers/user/routes";

export const app = fastify({
  logger: true,
  disableRequestLogging: false,
});

app.register(personRoutes);
app.register(userRoutes);
