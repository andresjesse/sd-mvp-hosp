export class UnauthenticatedUserError extends Error {
  constructor(message = 'Session user is not present!') {
    super(message)
  }
}
