export interface Ingredient {
  _id: string;
  name: string;
  quantity: string;
}

export interface Step {
  _id: string;
  stepNumber: string;
  instruction: string;
}

export interface Recipe {
  _id: string;
  user: string;
  title: string;
  description: string;
  imageUrl: string;
  cookingTime: number;
  servings: number;
  category: string;
  ingredients: Ingredient[];
  steps: Step[];
  likes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateRecipeRequest {
  title: string;
  description: string;
  cookingTime: number;
  servings: number;
  category: string;
  imageUrl?: string;
  ingredients: {
    name: string;
    quantity: string;
  }[];
  steps: {
    stepNumber: number;
    instruction: string;
  }[];
}
