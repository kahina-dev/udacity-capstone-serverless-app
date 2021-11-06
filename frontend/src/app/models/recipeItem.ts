export interface RecipeItem {
  userId: string
  recipeId: string
  name: string
  category: string
  ingredients: string
  preparation: string
  preparationTime?: string
  cookingTime?: string
  private: number
  attachmentUrl?: string
}
