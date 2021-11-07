import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getPublicRecipes} from '../../businessLogic/recipes'

export const handler = middy(
  async (event: APIGatewayProxyEvent
    ): Promise<APIGatewayProxyResult> => {
    console.log(event.body)
    const recipes = await getPublicRecipes();

    return {
      statusCode: 200,
      body: JSON.stringify({
        item: recipes
      })
    }
  })

handler.use(
  cors({
    credentials: true
  })
)
