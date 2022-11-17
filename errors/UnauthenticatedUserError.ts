export class UnauthenticatedUserError extends Error {
  data?: string | null

  constructor(data?: string | null) {
    super()

    this.data = data
  }
}
