import "reflect-metadata";
import "@/lib/typeorm/typeorm";
import fastify from "fastify";
import { personRoutes } from "./controllers/person/routes";
import { userRoutes } from "./controllers/user/routes";

import { globalErrorHandler } from "./utils/global-error-handler";
import { addressRoutes } from "./controllers/address/routes";
import { productRoutes } from "./controllers/product/routes";
import { categoryRoutes } from "./controllers/category/routes";

export const app = fastify();

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
