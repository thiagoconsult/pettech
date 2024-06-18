import { appDataSource } from "@/lib/typeorm/typeorm";
import { ICategoryRepository } from "../category.repository.interface";
import { Repository } from "typeorm";
import { Category } from "@/entities/category.entity";

export class CategoryRepository implements ICategoryRepository {
  private readonly repository: Repository<Category>;

  constructor() {
    this.repository = appDataSource.getRepository(Category);
  }

  async create(name: string): Promise<void> {
    await this.repository.save({ name });
  }
}
