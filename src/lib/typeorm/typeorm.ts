import { DataSource } from "typeorm";
import { env } from "@/env";
import { error } from "console";
import { Product } from "@/entities/product.entity";
import { Category } from "@/entities/category.entity";
import { ProductAutoGenerateUUID1719264459763 } from "./migrations/1719264459763-ProductAutoGenerateUUID";

export const appDataSource = new DataSource({
  type: "postgres",
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: [Product, Category],
  migrations: [ProductAutoGenerateUUID1719264459763],
  logging: env.NODE_ENV === "development",
});

appDataSource
  .initialize()
  .then(() => {
    console.log(`Database with typeorm started at port #${env.DATABASE_PORT}`);
  })
  .catch(() => {
    console.error(`Error connecting to database with typeorm, ${error}`);
  });
