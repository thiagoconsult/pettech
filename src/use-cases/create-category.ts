import { ICategoryRepository } from "@/repositories/category.repository.interface";

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async handler(name: string): Promise<void> {
    await this.categoryRepository.create(name);
  }
}
