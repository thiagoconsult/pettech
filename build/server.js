"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

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

// src/app.ts
var import_reflect_metadata = require("reflect-metadata");

// src/lib/typeorm/typeorm.ts
var import_typeorm3 = require("typeorm");
var import_console = require("console");

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

// src/app.ts
var import_fastify = __toESM(require("fastify"));

// src/lib/pg/db.ts
var import_pg = require("pg");
var CONFIG = {
  host: env.POSTGRES_HOST,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  port: env.POSTGRES_PORT
};
var Database = class {
  pool;
  client;
  constructor() {
    this.pool = new import_pg.Pool(CONFIG);
    this.connection();
  }
  async connection() {
    try {
      this.client = await this.pool.connect();
    } catch (error2) {
      console.error(`Connection database error ${error2}`);
      throw new Error(`Connection database error ${error2}`);
    }
  }
  get clientInstance() {
    return this.client;
  }
};
var database = new Database();

// src/repositories/pg/person.repository.ts
var PersonRepository = class {
  async create({
    cpf,
    name,
    birth,
    email,
    user_id
  }) {
    const result = await database.clientInstance?.query(
      `INSERT INTO "person" (cpf, name, birth, email, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [cpf, name, birth, email, user_id]
    );
    return result?.rows[0];
  }
};

// src/use-cases/create-person.ts
var CreatePersonUseCase = class {
  constructor(personRepository) {
    this.personRepository = personRepository;
  }
  async handler(person) {
    return this.personRepository.create(person);
  }
};

// src/use-cases/factory/make-create-person-use-case.ts
function MakeCreatePersonUseCase() {
  const personRepository = new PersonRepository();
  const createPersonUseCase = new CreatePersonUseCase(personRepository);
  return createPersonUseCase;
}

// src/http/controllers/person/create.ts
var import_zod2 = __toESM(require("zod"));
async function create(req, reply) {
  const registerBodySchema = import_zod2.default.object({
    cpf: import_zod2.default.string(),
    name: import_zod2.default.string(),
    birth: import_zod2.default.coerce.date(),
    email: import_zod2.default.string().email(),
    user_id: import_zod2.default.number()
  });
  const { cpf, name, birth, email, user_id } = registerBodySchema.parse(
    req.body
  );
  const createPersonUseCase = MakeCreatePersonUseCase();
  const result = await createPersonUseCase.handler({
    cpf,
    name,
    birth,
    email,
    user_id
  });
  return reply.status(201).send(result);
}

// src/http/controllers/person/routes.ts
async function personRoutes(app2) {
  app2.post("/person", create);
}

// src/repositories/pg/user.repository.ts
var UserRepository = class {
  async findByUsername(username) {
    const result = await database.clientInstance?.query(
      `
      SELECT * FROM "user" WHERE "user".username = $1
      `,
      [username]
    );
    return result?.rows[0];
  }
  async create({ username, password }) {
    const result = await database.clientInstance?.query(
      `INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING *`,
      [username, password]
    );
    return result?.rows[0];
  }
  async findWithPerson(userid) {
    const result = await database.clientInstance?.query(
      `SELECT * FROM "user"
      LEFT JOIN person ON "user".id = person.user_id
      WHERE "user".id = $1`,
      [userid]
    );
    return result?.rows[0];
  }
};

// src/use-cases/create-user.ts
var CreateUserUseCase = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async handler(user) {
    const result = await this.userRepository.create(user);
    return result;
  }
};

// src/use-cases/factory/make-create-user-use-case.ts
function MakeCreateUserUseCase() {
  const userRepository = new UserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);
  return createUserUseCase;
}

// src/http/controllers/user/create.ts
var import_bcryptjs = require("bcryptjs");
var import_zod3 = require("zod");
async function create2(req, reply) {
  const registerBodySchema = import_zod3.z.object({
    username: import_zod3.z.string(),
    password: import_zod3.z.string()
  });
  const { username, password } = registerBodySchema.parse(req.body);
  const hashedPassword = await (0, import_bcryptjs.hash)(password, 8);
  const userWithHashedPassword = { username, password: hashedPassword };
  const createUserUseCase = MakeCreateUserUseCase();
  const user = await createUserUseCase.handler(userWithHashedPassword);
  return reply.status(201).send({ id: user?.id, username: user?.username });
}

// src/use-cases/errors/resource-not-found-error.ts
var ResourseNotFoundError = class extends Error {
  constructor() {
    super("404 - Resource Not Found");
  }
};

// src/use-cases/find-with-person.ts
var FindWithPersonUseCase = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async handler(userid) {
    const user = await this.userRepository.findWithPerson(userid);
    if (!user) throw new ResourseNotFoundError();
    return user;
  }
};

// src/use-cases/factory/make-find-with-person.ts
function MakeFindWithPerson() {
  const userRepository = new UserRepository();
  const findWithPersonUseCase = new FindWithPersonUseCase(userRepository);
  return findWithPersonUseCase;
}

// src/http/controllers/user/find-user.ts
var import_zod4 = require("zod");
async function findUSer(req, reply) {
  const registerParamsSchema = import_zod4.z.object({
    id: import_zod4.z.coerce.number()
  });
  const { id } = registerParamsSchema.parse(req.params);
  const findWithPersonUseCase = MakeFindWithPerson();
  const result = await findWithPersonUseCase.handler(id);
  return reply.send(result);
}

// src/use-cases/errors/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("Username or password is incorrect");
  }
};

// src/use-cases/signin.ts
var SigninUseCase = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async handler(username) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new InvalidCredentialsError();
    }
    return user;
  }
};

// src/use-cases/factory/make-signin-use-case.ts
function makeSigninUseCase() {
  const userRepository = new UserRepository();
  const signinUseCase = new SigninUseCase(userRepository);
  return signinUseCase;
}

// src/http/controllers/user/signin.ts
var import_bcryptjs2 = require("bcryptjs");
var import_zod5 = require("zod");
async function signin(request, reply) {
  const registerBodySchema = import_zod5.z.object({
    username: import_zod5.z.string(),
    password: import_zod5.z.string()
  });
  const { username, password } = registerBodySchema.parse(request.body);
  const signinUseCase = makeSigninUseCase();
  const user = await signinUseCase.handler(username);
  const doesPasswordMatch = await (0, import_bcryptjs2.compare)(password, user.password);
  if (!doesPasswordMatch) {
    throw new InvalidCredentialsError();
  }
  const token = await reply.jwtSign({ username });
  return reply.status(200).send({ token });
}

// src/http/controllers/user/routes.ts
async function userRoutes(app2) {
  app2.get("/user/:id", findUSer);
  app2.post("/user/signin", signin);
  app2.post("/user", create2);
}

// src/utils/global-error-handler.ts
var import_zod6 = require("zod");
var errorHandlerMap = {
  ZodError: (error2, _, reply) => {
    reply.status(400).send({
      mesage: "Validation error",
      ...error2 instanceof import_zod6.ZodError && { error: error2.format() }
    });
  },
  ResourseNotFoundError: (error2, _, reply) => {
    reply.status(404).send({ mesage: error2.message });
  },
  InvalidCredentialsError: (error2, _, reply) => {
    reply.status(404).send({ message: error2.message });
  }
};
function globalErrorHandler(error2, _, reply) {
  const handler = errorHandlerMap[error2.constructor.name];
  if (handler) return handler(error2, _, reply);
  if (env.NODE_ENV === "development") {
    console.error(error2);
  }
  return reply.status(500).send({ mesage: "Internal server error" });
}

// src/repositories/pg/address.repository.ts
var AddressRepository = class {
  async findAddressByPersonId(personId, page, limit) {
    const offset = (page - 1) * limit;
    const query = `
    SELECT address.*, person.*
    FROM address
    JOIN person ON address.person_id = person.id
    WHERE person.id = $1
    LIMIT $2 OFFSET $3
    `;
    const result = await database.clientInstance?.query(
      query,
      [personId, limit, offset]
    );
    return result?.rows || [];
  }
  async create({
    street,
    city,
    state,
    zip_code,
    person_id
  }) {
    const result = await database.clientInstance?.query(
      `
      INSERT INTO address (street, city, state, zip_code, person_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [street, city, state, zip_code, person_id]
    );
    return result?.rows[0];
  }
};

// src/use-cases/create-address.ts
var CreateAddressUseCase = class {
  constructor(addressRepository) {
    this.addressRepository = addressRepository;
  }
  async handler(address) {
    return this.addressRepository.create(address);
  }
};

// src/use-cases/factory/make-create-address-use-case.ts
function makeCreateAddressUseCase() {
  const addressRepository = new AddressRepository();
  const createAddressUseCase = new CreateAddressUseCase(addressRepository);
  return createAddressUseCase;
}

// src/http/controllers/address/create.ts
var import_zod7 = require("zod");
async function create3(req, reply) {
  const registerBodySchema = import_zod7.z.object({
    street: import_zod7.z.string(),
    city: import_zod7.z.string(),
    state: import_zod7.z.string(),
    zip_code: import_zod7.z.string(),
    person_id: import_zod7.z.coerce.number()
  });
  const { street, city, state, zip_code, person_id } = registerBodySchema.parse(
    req.body
  );
  const createAddressUseCase = makeCreateAddressUseCase();
  const result = await createAddressUseCase.handler({
    street,
    city,
    state,
    zip_code,
    person_id
  });
  reply.status(201).send(result);
}

// src/use-cases/find-address-by-person.ts
var FindAddressByPersonUseCase = class {
  constructor(addressRepository) {
    this.addressRepository = addressRepository;
  }
  async handler(personId, page, limit) {
    return this.addressRepository.findAddressByPersonId(personId, page, limit);
  }
};

// src/use-cases/factory/make-find-address-by-person-use-case.ts
function makeFindAddressByPersonUseCase() {
  const addressRepository = new AddressRepository();
  const findAddressByPersonUseCase = new FindAddressByPersonUseCase(
    addressRepository
  );
  return findAddressByPersonUseCase;
}

// src/http/controllers/address/find.ts
var import_zod8 = require("zod");
async function find(request, reply) {
  const registerParamsSchema = import_zod8.z.object({
    personId: import_zod8.z.coerce.number()
  });
  const registerQuerySchema = import_zod8.z.object({
    page: import_zod8.z.coerce.number(),
    limit: import_zod8.z.coerce.number()
  });
  const { personId } = registerParamsSchema.parse(request.params);
  const { page, limit } = registerQuerySchema.parse(request.query);
  const findAddressByPerson = makeFindAddressByPersonUseCase();
  const result = await findAddressByPerson.handler(personId, page, limit);
  reply.status(200).send(result);
}

// src/http/controllers/address/routes.ts
async function addressRoutes(app2) {
  app2.get("/address/person/:personId", find);
  app2.post("/address", create3);
}

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
var import_zod9 = require("zod");
async function create4(request, reply) {
  const registerBodySchema = import_zod9.z.object({
    name: import_zod9.z.string(),
    description: import_zod9.z.string(),
    image_url: import_zod9.z.string(),
    price: import_zod9.z.coerce.number(),
    categories: import_zod9.z.array(
      import_zod9.z.object({
        id: import_zod9.z.coerce.number().optional(),
        name: import_zod9.z.string()
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
var import_zod10 = require("zod");
async function findAll(request, reply) {
  const registerQuerySchema = import_zod10.z.object({
    page: import_zod10.z.coerce.number().default(1),
    limit: import_zod10.z.coerce.number().default(10)
  });
  const { page, limit } = registerQuerySchema.parse(request.query);
  const findAllProductUseCase = makeFindAllProductUseCase();
  const result = await findAllProductUseCase.handler(page, limit);
  return reply.status(200).send(result);
}

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
var import_zod11 = require("zod");
async function findById(request, reply) {
  const registerParamsSchema = import_zod11.z.object({
    id: import_zod11.z.coerce.string()
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
var import_zod12 = require("zod");
async function updateProduct(request, reply) {
  const registerParamsSchema = import_zod12.z.object({
    id: import_zod12.z.coerce.string()
  });
  const { id } = registerParamsSchema.parse(request.params);
  const registerBodySchema = import_zod12.z.object({
    name: import_zod12.z.string(),
    description: import_zod12.z.string(),
    image_url: import_zod12.z.string(),
    price: import_zod12.z.coerce.number(),
    categories: import_zod12.z.array(
      import_zod12.z.object({
        id: import_zod12.z.coerce.number(),
        name: import_zod12.z.string()
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
var import_zod13 = require("zod");
async function deleteProduct(request, reply) {
  const registerParamsSchema = import_zod13.z.object({
    id: import_zod13.z.coerce.string()
  });
  const { id } = registerParamsSchema.parse(request.params);
  const deleteProductUseCase = makeDeleteProductUseCase();
  await deleteProductUseCase.handler(id);
  return reply.status(204).send();
}

// src/http/controllers/product/routes.ts
async function productRoutes(app2) {
  app2.get("/product", findAll);
  app2.get("/product/:id", findById);
  app2.post("/product", create4);
  app2.put("/product/:id", updateProduct);
  app2.delete("/product/:id", deleteProduct);
}

// src/repositories/typeorm/category.repository.ts
var CategoryRepository = class {
  repository;
  constructor() {
    this.repository = appDataSource.getRepository(Category);
  }
  async create(name) {
    await this.repository.save({ name });
  }
};

// src/use-cases/create-category.ts
var CreateCategoryUseCase = class {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }
  async handler(name) {
    await this.categoryRepository.create(name);
  }
};

// src/use-cases/factory/make-create-category-use-case.ts
function makeCreateCategoryUseCase() {
  const categoryRepository = new CategoryRepository();
  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
  return createCategoryUseCase;
}

// src/http/controllers/category/create.ts
var import_zod14 = require("zod");
async function create5(request, reply) {
  const registerBodySchema = import_zod14.z.object({
    name: import_zod14.z.string()
  });
  const { name } = registerBodySchema.parse(request.body);
  const createCategoryUseCase = makeCreateCategoryUseCase();
  await createCategoryUseCase.handler(name);
}

// src/http/controllers/category/routes.ts
async function categoryRoutes(app2) {
  app2.post("/category", create5);
}

// src/app.ts
var import_jwt = __toESM(require("@fastify/jwt"));

// src/http/middlewares/jwt-validate.ts
async function jwtValidate(request, reply) {
  try {
    const routeFreeList = ["POST-/user", "POST-/user/signin"];
    const validadeRoute = `${request.method}-${request.routeOptions.url}`;
    if (routeFreeList.includes(validadeRoute)) return;
    await request.jwtVerify();
  } catch (error2) {
    return reply.status(401).send({ message: "Unauthorized" });
  }
}

// src/app.ts
var app = (0, import_fastify.default)();
app.register(import_jwt.default, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: "10m" }
});
app.addHook("onRequest", jwtValidate);
app.register(personRoutes);
app.register(userRoutes);
app.register(addressRoutes);
app.register(productRoutes);
app.register(categoryRoutes);
app.setErrorHandler(globalErrorHandler);

// src/server.ts
app.listen({
  host: "localhost",
  port: env.PORT
}).then(() => {
  console.log(`Server started at port #${env.PORT}`);
});
