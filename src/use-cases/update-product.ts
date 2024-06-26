import { IProduct } from "@/entities/models/product.interface";
import { IProductRepository } from "@/repositories/product.repository.interface";

export class UpdateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async handler(product: IProduct): Promise<IProduct> {
    return this.productRepository.updateProduct(product);
  }
}
