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

// src/http/controllers/address/find.ts
var find_exports = {};
__export(find_exports, {
  find: () => find
});
module.exports = __toCommonJS(find_exports);

// src/lib/pg/db.ts
var import_pg = require("pg");

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

// src/lib/pg/db.ts
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
var import_zod2 = require("zod");
async function find(request, reply) {
  const registerParamsSchema = import_zod2.z.object({
    personId: import_zod2.z.coerce.number()
  });
  const registerQuerySchema = import_zod2.z.object({
    page: import_zod2.z.coerce.number(),
    limit: import_zod2.z.coerce.number()
  });
  const { personId } = registerParamsSchema.parse(request.params);
  const { page, limit } = registerQuerySchema.parse(request.query);
  const findAddressByPerson = makeFindAddressByPersonUseCase();
  const result = await findAddressByPerson.handler(personId, page, limit);
  reply.status(200).send(result);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  find
});
