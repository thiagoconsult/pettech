import { IProductRepository } from "@/repositories/product.repository.interface";

export class DeleteProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async handler(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
