import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { updateRecipe } from '../../businessLogic/recipes'
import { UpdateRecipeRequest } from '../../requests/UpdateRecipeRequest'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const recipeId = event.pathParameters.recipeId
    const updatedRecipe: UpdateRecipeRequest = JSON.parse(event.body)
    const userId=getUserId(event)
    const updatedItem=updateRecipe(updatedRecipe, userId, recipeId)

    return {
      statusCode: 201,
      body: JSON.stringify({
        updatedItem
      })
    }
  })

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
