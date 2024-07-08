import "reflect-metadata";
import "@/lib/typeorm/typeorm";
import fastify from "fastify";
import { personRoutes } from "./http/controllers/person/routes";
import { userRoutes } from "./http/controllers/user/routes";

import { globalErrorHandler } from "./utils/global-error-handler";
import { addressRoutes } from "./http/controllers/address/routes";
import { productRoutes } from "./http/controllers/product/routes";
import { categoryRoutes } from "./http/controllers/category/routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { jwtValidate } from "./http/middlewares/jwt-validate";

export const app = fastify({ logger: true });

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: "10m" },
});

app.addHook("onRequest", jwtValidate);

app.register(personRoutes);
app.register(userRoutes);
app.register(addressRoutes);
app.register(productRoutes);
app.register(categoryRoutes);

app.setErrorHandler(globalErrorHandler);

// app.setErrorHandler((error, _, reply) => {
//   if (error instanceof ZodError) {
//     return reply
//       .status(400)
//       .send({ mesage: "Validation error", errors: error.format() });
//   }

//   if (env.NODE_ENV === "development") {
//     console.log(error);
//   }

//   if (error instanceof ResourseNotFoundError) {
//     return reply.status(404).send({ mesage: error.message });
//   }

//   return reply.status(500).send({ mesage: "Internal server error" });
// });
