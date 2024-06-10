import fastify from "fastify";
import { personRoutes } from "./controllers/person/routes";
import { userRoutes } from "./controllers/user/routes";

import { globalErrorHandler } from "./utils/global-error-handler";
import { addressRoutes } from "./controllers/address/routes";

export const app = fastify();

app.register(personRoutes);
app.register(userRoutes);
app.register(addressRoutes);

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
