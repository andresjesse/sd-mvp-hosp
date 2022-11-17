export class InvalidCredentialsError extends Error {
  constructor() {
    const message = 'Invalid credentials.'
    super(message)

    Object.setPrototypeOf(this, InvalidCredentialsError.prototype)
  }

  getErrorMessage() {
    return this.message
  }
}
