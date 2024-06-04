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

// src/app.ts
var import_fastify = __toESM(require("fastify"));

// src/lib/pg/db.ts
var import_pg = require("pg");
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

// src/repositories/person.repository.ts
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

// src/controllers/person/create.ts
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
  try {
    const personRepository = new PersonRepository();
    const createPersonUseCase = new CreatePersonUseCase(personRepository);
    const result = await createPersonUseCase.handler({
      cpf,
      name,
      birth,
      email,
      user_id
    });
    return reply.status(201).send(result);
  } catch (error) {
    console.error(error);
    throw new Error("Internal Error");
  }
}

// src/controllers/person/routes.ts
async function personRoutes(app2) {
  app2.post("/person", create);
}

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
var import_zod3 = require("zod");
async function create2(req, reply) {
  const registerBodySchema = import_zod3.z.object({
    username: import_zod3.z.string(),
    password: import_zod3.z.string()
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
async function userRoutes(app2) {
  app2.post("/user", create2);
}

// src/app.ts
var app = (0, import_fastify.default)({
  logger: true,
  disableRequestLogging: false
});
app.register(personRoutes);
app.register(userRoutes);

// src/server.ts
app.listen({
  host: "localhost",
  port: env.PORT
}).then(() => {
});
