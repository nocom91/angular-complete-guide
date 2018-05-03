import { Ingredient } from './ingredient.model';

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
        this.name = name;
        this.imagePath = imagePath;
        this.description = description;
        this.ingredients = ingredients;
    }
}
