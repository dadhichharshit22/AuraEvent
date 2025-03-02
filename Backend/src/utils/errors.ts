export class NotFoundError extends Error {
    constructor(message = "Resource not found") {
      super(message);
      this.name = "NotFoundError";
    }
  }
  
  export class ValidationError extends Error {
    constructor(message = "Invalid request data") {
      super(message);
      this.name = "ValidationError";
    }
  }
  