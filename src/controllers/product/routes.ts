import { FastifyInstance } from "fastify";
import { create } from "./create";
import { findAll } from "./findAll";
import { findById } from "./findById";
import { updateProduct } from "./updateProduct";
import { deleteProduct } from "./deleteProduct";

export async function productRoutes(app: FastifyInstance) {
  app.get("/product", findAll);
  app.get("/product/:id", findById);
  app.post("/product", create);
  app.put("/product/:id", updateProduct);
  app.delete("/product/:id", deleteProduct);
}
