import { LightningElement, api} from 'lwc';
// import apex method from apex controller 
import getRecipe from '@salesforce/apex/RecipeController.getRecipe';

export default class RecipeListWithInstructions extends LightningElement {
    // initialize the class variables
    
    @api image;
    @api recipeId;
    @api title;
    @api summary;
    @api time;
    @api analyzedInstructions;
    @api ingredients=[];
    dishList;
    dietList;
    message;

    // getter/setter pair in(LWC), exposed to the parent component using @api.
    @api
    set dishTypes(data)
    {   
         // Converts array to comma-separated string
        this.dishList=data && data.join();
    }
    // Allows internal access to the formatted dish list
    get dishTypes()
    {
        return this.dishList;
    }
    @api
    set diets(data) 
    {
        this.dietList=data && data.join();
    }
    get diets()
    {
        return this.dietList;
    }
    // Returns true if summary has content, false otherwise
    get hasDetails() 
    {
        return !!this.summary;
    }
    
    fetchRecipe()
    {
        console.log('Calling getRecipe with recipeId:', this.recipeid);
        //  calling apex method from apex controller and converting the recipe object to JSON string
        getRecipe({recipeId: this.recipeId}) 
        .then(result => {
            const recipe = JSON.parse(result);
            if(recipe) 
            {
                this.image= recipe.image;
                this.title=recipe.title;
                this.time=recipe.readyInMinutes;
                this.summary=recipe.summary;  
                this.dishList = recipe.dishTypes && recipe.dishTypes.join();
                this.dietList = recipe.diets && recipe.diets.join();
                // Converts raw ingredient objects into display-friendly strings(amount1 unitCup nameOfFood)
                const ingredients = recipe.extendedIngredients.map(ingridient=>{return`${ingridient.amount} ${ingridient.unit} ${ingridient.name}`;});
                this.ingredients = ingredients;
                // to check if there any direction to use the receipe details
                if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0)
                {
                    this.analyzedInstructions = recipe.analyzedInstructions;
                } 
                else 
                {
                this.message = 'No directions are available for this recipe';
                }
            }    
        })
        // show error if there is no recipe data
        .catch(error => {
        this.error = error.message;
        console.error('Error in loading recipe:', error);
        this.ingredients = undefined;
        });
    }
} 