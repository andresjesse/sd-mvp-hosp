export class ApiHandleError extends Error {
  errorCode: number
  data: string | { [key: string]: string | Iterable<string> } | null

  constructor(
    errorCode: number,
    data: string | { [key: string]: string | Iterable<string> } | null
  ) {
    super()
    this.errorCode = errorCode
    this.data = data
  }
}
