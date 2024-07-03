"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// src/http/controllers/product/routes.ts
var routes_exports = {};
__export(routes_exports, {
  productRoutes: () => productRoutes
});
module.exports = __toCommonJS(routes_exports);

// src/entities/product.entity.ts
var import_typeorm2 = require("typeorm");

// src/entities/category.entity.ts
var import_typeorm = require("typeorm");
var Category = class {
  id;
  name;
  createdAt;
};
__decorateClass([
  (0, import_typeorm.PrimaryGeneratedColumn)("increment", {
    name: "id"
  })
], Category.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "name",
    type: "varchar"
  })
], Category.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "creation_date",
    type: "time without time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
], Category.prototype, "createdAt", 2);
Category = __decorateClass([
  (0, import_typeorm.Entity)({
    name: "category"
  })
], Category);

// src/entities/product.entity.ts
var Product = class {
  id;
  name;
  description;
  image_url;
  price;
  categories;
};
__decorateClass([
  (0, import_typeorm2.PrimaryGeneratedColumn)("uuid", {
    name: "id"
  })
], Product.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "name",
    type: "varchar"
  })
], Product.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "description",
    type: "text"
  })
], Product.prototype, "description", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "image_url",
    type: "varchar"
  })
], Product.prototype, "image_url", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "price",
    type: "double precision"
  })
], Product.prototype, "price", 2);
__decorateClass([
  (0, import_typeorm2.ManyToMany)(() => Category, {
    cascade: true
  }),
  (0, import_typeorm2.JoinTable)({
    name: "product_category",
    joinColumn: {
      name: "product_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "category_id",
      referencedColumnName: "id"
    }
  })
], Product.prototype, "categories", 2);
Product = __decorateClass([
  (0, import_typeorm2.Entity)({
    name: "product"
  })
], Product);

// src/lib/typeorm/typeorm.ts
var import_typeorm3 = require("typeorm");

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "production", "test"]).default("development"),
  PORT: import_zod.z.coerce.number().default(3e3),
  POSTGRES_HOST: import_zod.z.string(),
  POSTGRES_USER: import_zod.z.string(),
  POSTGRES_PASSWORD: import_zod.z.string(),
  POSTGRES_DB: import_zod.z.string(),
  POSTGRES_PORT: import_zod.z.coerce.number(),
  JWT_SECRET: import_zod.z.string()
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error("Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables");
}
var env = _env.data;

// src/lib/typeorm/typeorm.ts
var import_console = require("console");

// src/lib/typeorm/migrations/1719264459763-ProductAutoGenerateUUID.ts
var ProductAutoGenerateUUID1719264459763 = class {
  async up(queryRunner) {
    await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `);
    await queryRunner.query(`
      ALTER TABLE product
      ALTER COLUMN id SET DEFAULT uuid_generate_v4();
      `);
  }
  async down(queryRunner) {
    await queryRunner.query(`
      ALTER TABLE product
      ALTER COLUMN id DROP DEFAULT;
      `);
  }
};

// src/lib/typeorm/typeorm.ts
var appDataSource = new import_typeorm3.DataSource({
  type: "postgres",
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  entities: [Product, Category],
  migrations: [ProductAutoGenerateUUID1719264459763],
  logging: env.NODE_ENV === "development"
});
appDataSource.initialize().then(() => {
  console.log(`Database with typeorm started at port #${env.POSTGRES_PORT}`);
}).catch(() => {
  console.error(`Error connecting to database with typeorm, ${import_console.error}`);
});

// src/repositories/typeorm/product.repository.ts
var ProductRepository = class {
  repository;
  constructor() {
    this.repository = appDataSource.getRepository(Product);
  }
  async findAll(page, limit) {
    return this.repository.find({
      relations: ["categories"],
      skip: (page - 1) * limit,
      take: limit
    });
  }
  async findById(id) {
    return this.repository.findOne({
      relations: ["categories"],
      where: { id }
    });
  }
  async create(product) {
    return this.repository.save(product);
  }
  async updateProduct(product) {
    return this.repository.save(product);
  }
  async delete(id) {
    await this.repository.delete(id);
  }
};

// src/use-cases/create-produtc.ts
var CreateProdutcUseCase = class {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  async handler(product) {
    return this.productRepository.create(product);
  }
};

// src/use-cases/factory/make-create-product.use-case.ts
function makeCreateProductUseCase() {
  const productRepository = new ProductRepository();
  const createProductUseCase = new CreateProdutcUseCase(productRepository);
  return createProductUseCase;
}

// src/http/controllers/product/create.ts
var import_zod2 = require("zod");
async function create(request, reply) {
  const registerBodySchema = import_zod2.z.object({
    name: import_zod2.z.string(),
    description: import_zod2.z.string(),
    image_url: import_zod2.z.string(),
    price: import_zod2.z.coerce.number(),
    categories: import_zod2.z.array(
      import_zod2.z.object({
        id: import_zod2.z.coerce.number().optional(),
        name: import_zod2.z.string()
      })
    ).optional()
  });
  const { name, description, image_url, price, categories } = registerBodySchema.parse(request.body);
  const createProductUseCase = makeCreateProductUseCase();
  const product = await createProductUseCase.handler({
    name,
    description,
    image_url,
    price,
    categories
  });
  return reply.status(201).send(product);
}

// src/use-cases/find-all-product.ts
var FindAllProductUseCase = class {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  async handler(page, limit) {
    return this.productRepository.findAll(page, limit);
  }
};

// src/use-cases/factory/make-find-all-product-use-case.ts
function makeFindAllProductUseCase() {
  const productRepository = new ProductRepository();
  const findAllProductUseCase = new FindAllProductUseCase(productRepository);
  return findAllProductUseCase;
}

// src/http/controllers/product/findAll.ts
var import_zod3 = require("zod");
async function findAll(request, reply) {
  const registerQuerySchema = import_zod3.z.object({
    page: import_zod3.z.coerce.number().default(1),
    limit: import_zod3.z.coerce.number().default(10)
  });
  const { page, limit } = registerQuerySchema.parse(request.query);
  const findAllProductUseCase = makeFindAllProductUseCase();
  const result = await findAllProductUseCase.handler(page, limit);
  return reply.status(200).send(result);
}

// src/use-cases/errors/resource-not-found-error.ts
var ResourseNotFoundError = class extends Error {
  constructor() {
    super("404 - Resource Not Found");
  }
};

// src/use-cases/find-by-id-product.ts
var FindByIdProductUseCase = class {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  async handler(id) {
    const result = await this.productRepository.findById(id);
    if (!result) throw new ResourseNotFoundError();
    return result;
  }
};

// src/use-cases/factory/make-find-by-id-product-use-case.ts
function makeFindByIdProductUseCase() {
  const productRepository = new ProductRepository();
  const findByIdProductUseCase = new FindByIdProductUseCase(productRepository);
  return findByIdProductUseCase;
}

// src/http/controllers/product/findById.ts
var import_zod4 = require("zod");
async function findById(request, reply) {
  const registerParamsSchema = import_zod4.z.object({
    id: import_zod4.z.coerce.string()
  });
  const { id } = registerParamsSchema.parse(request.params);
  const findByIdUseCase = makeFindByIdProductUseCase();
  const result = await findByIdUseCase.handler(id);
  return reply.status(200).send(result);
}

// src/use-cases/update-product.ts
var UpdateProductUseCase = class {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  async handler(product) {
    return this.productRepository.updateProduct(product);
  }
};

// src/use-cases/factory/make-update-product-use-case.ts
function makeUpdateProductUseCase() {
  const productRepository = new ProductRepository();
  const updateProductUseCase = new UpdateProductUseCase(productRepository);
  return updateProductUseCase;
}

// src/http/controllers/product/updateProduct.ts
var import_zod5 = require("zod");
async function updateProduct(request, reply) {
  const registerParamsSchema = import_zod5.z.object({
    id: import_zod5.z.coerce.string()
  });
  const { id } = registerParamsSchema.parse(request.params);
  const registerBodySchema = import_zod5.z.object({
    name: import_zod5.z.string(),
    description: import_zod5.z.string(),
    image_url: import_zod5.z.string(),
    price: import_zod5.z.coerce.number(),
    categories: import_zod5.z.array(
      import_zod5.z.object({
        id: import_zod5.z.coerce.number(),
        name: import_zod5.z.string()
      })
    ).optional()
  });
  const { name, description, image_url, price, categories } = registerBodySchema.parse(request.body);
  const updateProductUseCase = makeUpdateProductUseCase();
  const result = await updateProductUseCase.handler({
    id,
    name,
    description,
    image_url,
    price,
    categories
  });
  return reply.status(200).send(result);
}

// src/use-cases/delete-product.ts
var DeleteProductUseCase = class {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  async handler(id) {
    await this.productRepository.delete(id);
  }
};

// src/use-cases/factory/make-delete-product-use-case.ts
function makeDeleteProductUseCase() {
  const productRepository = new ProductRepository();
  const deleteProductUseCase = new DeleteProductUseCase(productRepository);
  return deleteProductUseCase;
}

// src/http/controllers/product/deleteProduct.ts
var import_zod6 = require("zod");
async function deleteProduct(request, reply) {
  const registerParamsSchema = import_zod6.z.object({
    id: import_zod6.z.coerce.string()
  });
  const { id } = registerParamsSchema.parse(request.params);
  const deleteProductUseCase = makeDeleteProductUseCase();
  await deleteProductUseCase.handler(id);
  return reply.status(204).send();
}

// src/http/controllers/product/routes.ts
async function productRoutes(app) {
  app.get("/product", findAll);
  app.get("/product/:id", findById);
  app.post("/product", create);
  app.put("/product/:id", updateProduct);
  app.delete("/product/:id", deleteProduct);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  productRoutes
});
