import { ProductRepository } from "@/repositories/typeorm/product.repository";
import { FindByIdProductUseCase } from "../find-by-id-product";

export function makeFindByIdProductUseCase() {
  const productRepository = new ProductRepository();
  const findByIdProductUseCase = new FindByIdProductUseCase(productRepository);
  return findByIdProductUseCase;
}
