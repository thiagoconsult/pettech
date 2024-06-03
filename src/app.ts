import fastify from "fastify";
import { personRoutes } from "./controllers/person/routes";

export const app = fastify();

app.register(personRoutes);
