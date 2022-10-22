import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { ApiHandleError } from './apiHandleError'

export default function withErrorHandler(
  handler: NextApiHandler
): NextApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await handler(req, res)
    } catch (error) {
      const isApiError = error instanceof ApiHandleError

      if (!isApiError) {
        res.status(500).json({
          data: 'Something went wrong on server side. Try again or contact us.',
        })
        return
      }

      const apiError: ApiHandleError = error as ApiHandleError
      res.status(apiError.errorCode).json({
        data: apiError.data,
      })
    }
  }
}
