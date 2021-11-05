import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getRecipesForUser as getRecipesForUser } from '../../businessLogic/recipes'
import { getUserId } from '../utils';

export const handler = middy(
  async (event: APIGatewayProxyEvent
    ): Promise<APIGatewayProxyResult> => {
    console.log(event.body)
    const userId=getUserId(event)
    const todos = await getRecipesForUser(userId)

    return {
      statusCode: 200,
      body: JSON.stringify({
        items: todos
      })
    }
  })

handler.use(
  cors({
    credentials: true
  })
)
