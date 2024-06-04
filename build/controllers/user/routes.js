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

// src/controllers/user/routes.ts
var routes_exports = {};
__export(routes_exports, {
  userRoutes: () => userRoutes
});
module.exports = __toCommonJS(routes_exports);

// src/lib/pg/db.ts
var import_pg = require("pg");

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "production", "test"]).default("development"),
  PORT: import_zod.z.coerce.number().default(3e3),
  DATABASE_HOST: import_zod.z.string(),
  DATABASE_USER: import_zod.z.string(),
  DATABASE_PASSWORD: import_zod.z.string(),
  DATABASE_NAME: import_zod.z.string(),
  DATABASE_PORT: import_zod.z.coerce.number()
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error("Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables");
}
var env = _env.data;

// src/lib/pg/db.ts
var CONFIG = {
  host: env.DATABASE_HOST,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  port: env.DATABASE_PORT
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
    } catch (error) {
      console.error(`Connection database error ${error}`);
      throw new Error(`Connection database error ${error}`);
    }
  }
  get clientInstance() {
    return this.client;
  }
};
var database = new Database();

// src/repositories/user.repository.ts
var UserRepository = class {
  async create({ username, password }) {
    const result = await database.clientInstance?.query(
      `INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING *`,
      [username, password]
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
    return await this.userRepository.create(user);
  }
};

// src/controllers/user/create.ts
var import_zod2 = require("zod");
async function create(req, reply) {
  const registerBodySchema = import_zod2.z.object({
    username: import_zod2.z.string(),
    password: import_zod2.z.string()
  });
  const { username, password } = registerBodySchema.parse(req.body);
  try {
    const userRepository = new UserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const result = await createUserUseCase.handler({ username, password });
    return reply.status(201).send(result);
  } catch (error) {
    console.error(`Error creating user: ${error}`);
    throw new Error(`Error creating user: ${error}`);
  }
}

// src/controllers/user/routes.ts
async function userRoutes(app) {
  app.post("/user", create);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userRoutes
});
