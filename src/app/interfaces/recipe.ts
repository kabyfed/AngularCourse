import { Author } from "./author";
import { Comment } from "./comment";
import { FoodValue } from "./food-value";


interface CookingStep {
  title: string;
  description: string;
}

interface Ingredient {
  title: string;
  description: string;
}

export interface Recipe {

  id: string;
  body: string;
  title: string;
  tags: string[];
  image: string;
  timeCooking: number;
  foodValue: FoodValue;
  cookingSteps: CookingStep[];
  ingredients: Ingredient[];
  author: Author;
  comments: Comment[];
  createdOn: string;
  updatedOn: string;
}
