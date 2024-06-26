import { Repository } from "typeorm";
import { IProductRepository } from "../product.repository.interface";
import { Product } from "@/entities/product.entity";
import { appDataSource } from "@/lib/typeorm/typeorm";
import { IProduct } from "@/entities/models/product.interface";

export class ProductRepository implements IProductRepository {
  private readonly repository: Repository<Product>;

  constructor() {
    this.repository = appDataSource.getRepository(Product);
  }

  async findAll(page: number, limit: number): Promise<IProduct[]> {
    return this.repository.find({
      relations: ["categories"],
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findById(id: string): Promise<IProduct | null> {
    return this.repository.findOne({
      relations: ["categories"],
      where: { id },
    });
  }

  async create(product: IProduct): Promise<IProduct> {
    return this.repository.save(product);
  }

  async updateProduct(product: IProduct): Promise<IProduct> {
    return this.repository.save(product);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
