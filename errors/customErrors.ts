class NotFoundError extends Error {
  statusCode: number;
  name: string;
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
    this.name = "NotFoundError";
  }
}

export { NotFoundError };
