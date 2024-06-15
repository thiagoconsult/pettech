import { ProductRepository } from "@/repositories/typeorm/product.repository";
import { CreateProdutcUseCase } from "../create-produtc";

export function makeCreateProductUseCase() {
  const productRepository = new ProductRepository();
  const createProductUseCase = new CreateProdutcUseCase(productRepository);
  return createProductUseCase;
}
