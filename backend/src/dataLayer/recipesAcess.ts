import * as AWS from 'aws-sdk'
//import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { RecipeItem } from '../models/RecipeItem'
import { RecipeUpdate } from '../models/RecipeUpdate';

const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('RecipesAccess')

// TODO: Implement the dataLayer logic
export class RecipesAccess{

    constructor(
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly recipesTable = process.env.RECIPES_TABLE,
        private readonly recipeIndex=process.env.RECIPE_CATEGORY_INDEX,
        private readonly statusIndex=process.env.RECIPE_PUBLIC_INDEX) { }

    async getAllRecipes(userId: string): Promise<RecipeItem[]> {
        logger.info(`Getting all recipes for user ${userId}`)
    
        const result = await this.docClient.query({
          TableName: this.recipesTable,
          IndexName : this.recipeIndex,
          KeyConditionExpression: 'userId = :userId',
          ExpressionAttributeValues: {
          ':userId': userId
           },
          ScanIndexForward: true
        }).promise()
    
        const items = result.Items
        return items as RecipeItem[]
      }

      async getPublicRecipes(): Promise<RecipeItem[]> {
        logger.info(`Getting all recipes shared by users`)
    
        const result = await this.docClient.query({
          TableName: this.recipesTable,
          IndexName : this.statusIndex,
          KeyConditionExpression: '#p = :p',
          ExpressionAttributeValues: {
          ':p': 0
           },
           ExpressionAttributeNames: {
            "#p": "private"
           },
           ScanIndexForward: false
        }).promise()

        const items = result.Items
        return items as RecipeItem[]
      }

      async getRecipe(userId: string, recipeId: string):Promise<RecipeItem> {
        logger.info(`Getting recipe item with ID #${recipeId}`)
        const result = await this.docClient.get({
            TableName: this.recipesTable,
            Key: {
              userId,
              recipeId
            }
          }).promise()
        const item = result.Item

        return item as RecipeItem
      }

      async createRecipe(RecipeItem: RecipeItem):Promise<RecipeItem>{
        logger.info(`Creating a new recipe item`)
         await this.docClient.put({
            TableName: this.recipesTable,
            Item: RecipeItem
          }).promise()
          
          return RecipeItem
        }

        async updateRecipe(userId: string, recipeId: string, RecipeUpdate: RecipeUpdate):Promise<RecipeUpdate>{
            logger.info(`Updating recipe item having ID #${recipeId} for user #${userId}`)
            await this.docClient.update({
                TableName: this.recipesTable,
                Key: {
                  userId,
                  recipeId
                },
                UpdateExpression: "set #pt=:pt, #ct=:ct",
                ExpressionAttributeValues:{
                    ":pt":RecipeUpdate.preparationTime,
                    ":ct":RecipeUpdate.cookingTime
                },
                ExpressionAttributeNames: {
                "#pt": "preparationTime",
                "#ct": "cookingTime"
             }
            }).promise()
            
            return RecipeUpdate
            }

            async makePublic(userId: string, recipeId: string):Promise<string>{
              logger.info(`Make a recipe item having ID #${recipeId} for user #${userId} as public`)
              await this.docClient.update({
                  TableName: this.recipesTable,
                  Key: {
                    userId,
                    recipeId
                  },
                  UpdateExpression: "set #p=:p",
                  ExpressionAttributeValues:{
                      ":p":0
                  },
                  ExpressionAttributeNames: {
                  "#p": "private"
               }
              }).promise()
              
              return `Recipe ${recipeId} is now public`
              }
      
            async deleteRecipe(userId: string, recipeId: string){
             logger.info(`Deleting recipe item having ID #${recipeId} for user #${userId}`)
              await this.docClient.delete({
                  TableName: this.recipesTable,
                  Key: {
                    userId,
                    recipeId
                  }
                }).promise()  
            }
 }

      
        
