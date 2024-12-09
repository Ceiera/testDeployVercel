class HttpError extends Error {
  public statusCode;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, 400);
    this.name = "BAD_REQUEST";
  }
}

class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(message, 401);
    this.name = "UNAUTHORIZED";
  }
}

class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(message, 403);
    this.name = "FORBIDDEN";
  }
}

class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, 404);
    this.name = "NOT_FOUND";
  }
}

class ConflictError extends HttpError {
  constructor(message: string) {
    super(message, 409);
    this.name = "CONFLICT";
  }
}

class InternalServerError extends HttpError {
  constructor(message: string) {
    super(message, 500);
    this.name = "INTERNAL_SERVER_ERROR";
  }
}

export {
  HttpError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  NotFoundError,
  InternalServerError,
};
