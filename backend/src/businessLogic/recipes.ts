import { RecipesAccess } from '../dataLayer/recipesAcess'
import { AttachmentUtils } from '../fileStogare/attachmentUtils';
import { RecipeItem } from '../models/RecipeItem'
import { RecipeUpdate } from '../models/RecipeUpdate'
import { CreateRecipeRequest } from '../requests/CreateRecipeRequest'
import { UpdateRecipeRequest } from '../requests/UpdateRecipeRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import * as createError from 'http-errors'


const recipesAccess = new RecipesAccess()
const attachmentUtils = new AttachmentUtils()
const logger = createLogger('Recipes')

export async function getRecipesForUser(userId: string): Promise<RecipeItem[]> {
    logger.info(`Getting recipes for user ${userId}`)
    return await recipesAccess.getAllRecipes(userId)
}

export async function getPublicRecipes(): Promise<RecipeItem[]> {
  logger.info(`Getting recipes shared by users`)
  return await recipesAccess.getPublicRecipes();
}


export async function getRecipe(userId: string, recipeId: string): Promise<RecipeItem> {
    return await recipesAccess.getRecipe(userId, recipeId)
}

export async function createRecipe(createRecipeRequest: CreateRecipeRequest, userId: string):Promise<RecipeItem>{
    const recipeId = uuid.v4()
    return await recipesAccess.createRecipe({
        userId: userId,
        recipeId: recipeId,
        name: createRecipeRequest.name,
        category: createRecipeRequest.category,
        ingredients: createRecipeRequest.ingredients,
        preparation: createRecipeRequest.preparation,
        private: 1,
        attachmentUrl: await attachmentUtils.getUrl(recipeId)
      })
    }

    export async function updateRecipe(updateRecipeRequest: UpdateRecipeRequest, userId: string, recipeId: string):Promise<RecipeUpdate>{
      const RecipeItem= await recipesAccess.getRecipe(userId, recipeId)
      if (!RecipeItem) throw createError(404, 'This item does not exist!')
        return await recipesAccess.updateRecipe(
             userId,
             recipeId,
            {preparationTime: updateRecipeRequest.preparationTime,
            cookingTime: updateRecipeRequest.cookingTime})
    }

    export async function makePublic(userId: string, recipeId: string):Promise<string>{
        const RecipeItem= await recipesAccess.getRecipe(userId, recipeId)
        if (!RecipeItem) throw createError(404, 'This item does not exist!')
          return await recipesAccess.makePublic(userId, recipeId)
      }
  

    export async function deleteRecipe(userId: string, recipeId: string){
        const RecipeItem= await recipesAccess.getRecipe(userId, recipeId)
         if (!RecipeItem) throw createError(404, 'This item does not exist!')
         return await recipesAccess.deleteRecipe(userId, recipeId)
    }

    export async function createAttachmentPresignedUrl(recipeId: string): Promise<string> {
        return await attachmentUtils.getUploadUrl(recipeId)
    }


    



