export class InvalidCredentialsError extends Error {
  constructor() {
    const message = 'Invalid credentials.'
    super(message)
  }

  getErrorMessage() {
    return this.message
  }
}
