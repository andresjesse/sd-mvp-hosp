export class AuthPolicyError extends Error {
  data?: string

  constructor(data?: string) {
    super()

    this.data = data
  }
}
