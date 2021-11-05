import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getUserId } from '../utils'
import { getRecipe } from '../../businessLogic/recipes'

export const handler = middy(
  async (event: APIGatewayProxyEvent
    ): Promise<APIGatewayProxyResult> => {
    console.log(event.body)
    const recipeId = event.pathParameters.recipeId
    const userId=getUserId(event)
    const todo = await getRecipe(userId, recipeId)

    return {
      statusCode: 200,
      body: JSON.stringify({
        item: todo
      })
    }
  })

handler.use(
  cors({
    credentials: true
  })
)
