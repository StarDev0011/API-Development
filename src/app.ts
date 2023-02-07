/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import cors from 'cors'
import express, { json, NextFunction, Request as ExRequest, Response as ExResponse, urlencoded } from 'express'
import swaggerUi from 'swagger-ui-express'
import { ValidateError } from 'tsoa'
import { RegisterRoutes } from '../build/routes'
import swaggerDocument from '../build/swagger.json'

export const app = express()
const swaggerOptions = {
  swaggerOptions: {
    url: '/api-docs/swagger.json'
  }
}
// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true
  })
)

app.use(cors())
app.use(json())

app.get('/api-docs/swagger.json', (_req, res: ExResponse) => res.json(swaggerDocument))
app.use('/api-docs', swaggerUi.serveFiles(swaggerDocument, swaggerOptions), swaggerUi.setup(swaggerOptions))

RegisterRoutes(app)

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: 'Not Found'
  })
})

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if(err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields)
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields
    })
  }
  if(err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }

  next()
})
