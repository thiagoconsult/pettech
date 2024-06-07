export class ResourseNotFoundError extends Error {
  constructor() {
    super("404 - Resource Not Found");
  }
}
