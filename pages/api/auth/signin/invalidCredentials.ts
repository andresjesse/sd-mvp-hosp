export class InvalidCredentials extends Error {
  constructor() {
    const message = 'Invalid credentials.'
    super(message)

    Object.setPrototypeOf(this, InvalidCredentials.prototype)
  }

  getErrorMessage() {
    return this.message
  }
}
