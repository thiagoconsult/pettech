"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/person/routes.ts
var routes_exports = {};
__export(routes_exports, {
  personRoutes: () => personRoutes
});
module.exports = __toCommonJS(routes_exports);

// src/repositories/person.repository.ts
var PersonRepository = class {
  persons = [];
  async create(person) {
    person.id = 1;
    this.persons.push(person);
    return person;
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
var import_zod = __toESM(require("zod"));
async function create(req, reply) {
  const registerBodySchema = import_zod.default.object({
    cpf: import_zod.default.string(),
    name: import_zod.default.string(),
    birth: import_zod.default.coerce.date(),
    email: import_zod.default.string().email()
  });
  const { cpf, name, birth, email } = registerBodySchema.parse(req.body);
  try {
    const personRepository = new PersonRepository();
    const createPersonUseCase = new CreatePersonUseCase(personRepository);
    const result = await createPersonUseCase.handler({
      cpf,
      name,
      birth,
      email
    });
    return reply.status(201).send(result);
  } catch (error) {
    console.error(error);
    throw new Error("Internal Error");
  }
}

// src/controllers/person/routes.ts
async function personRoutes(app) {
  app.post("/person", create);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  personRoutes
});
