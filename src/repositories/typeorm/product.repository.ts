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

  async create(product: IProduct): Promise<IProduct> {
    return this.repository.save(product);
  }
}
