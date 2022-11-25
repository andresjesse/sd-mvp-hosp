export class AuthPolicyError extends Error {
  constructor(message = 'Policy Error.') {
    super(message)
  }
}
