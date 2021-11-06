export interface RecipeItem {
  userId: string
  recipeId: string
  name: string
  category: string
  ingredients: string
  preparation: string
  prepationTime?: string
  cookingTime?: string
  private: number
  attachmentUrl?: string
}
