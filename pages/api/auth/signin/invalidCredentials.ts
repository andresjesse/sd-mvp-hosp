export class InvalidCredentials extends Error {
  constructor() {
    const message: string = "Invalid credentials.";
    super(message);

    Object.setPrototypeOf(this, InvalidCredentials.prototype);
  }

  getErrorMessage() {
    return this.message;
  }
}
