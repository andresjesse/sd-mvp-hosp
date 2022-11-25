export class InvalidCredentialsError extends Error {
  constructor(message = 'Invalid credentials.') {
    super(message)
  }
}
