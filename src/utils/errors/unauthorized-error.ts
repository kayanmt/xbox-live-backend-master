export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(`Unauthorized: ${message}`);
    this.name = `Unauthorized: ${message}`;
  }
}
