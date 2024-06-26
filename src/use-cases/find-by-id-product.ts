import { IProduct } from "@/entities/models/product.interface";
import { IProductRepository } from "@/repositories/product.repository.interface";
import { ResourseNotFoundError } from "./errors/resource-not-found-error";

export class FindByIdProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async handler(id: string): Promise<IProduct | null> {
    const result = await this.productRepository.findById(id);
    if (!result) throw new ResourseNotFoundError();
    return result;
  }
}
