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

// src/use-cases/find-by-id-product.ts
var find_by_id_product_exports = {};
__export(find_by_id_product_exports, {
  FindByIdProductUseCase: () => FindByIdProductUseCase
});
module.exports = __toCommonJS(find_by_id_product_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FindByIdProductUseCase
});
