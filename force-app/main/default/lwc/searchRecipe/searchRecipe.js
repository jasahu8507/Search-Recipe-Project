import { LightningElement } from 'lwc';
// import apex method from apex controller
import recipeLogo from '@salesforce/resourceUrl/recipeLogo';
import getrandomRecipe from '@salesforce/apex/RecipeController.getrandomRecipe';
import getRecipeByIngredients from '@salesforce/apex/RecipeController.getRecipeByIngredients';
export default class SearchRecipe extends LightningElement {
    recipesearchLogo=recipeLogo;
    exploreRecipe = false;
    WelcomeContent=  "Welcome to Our Recipe Search Website!";
    exploreContent1= "Explore a world of culinary delights right at your fingertips! Whether you're a seasoned chef or just starting your cooking journey";
    exploreContent2=  "our recipe search website is your go-to destination for finding delicious recipes.";

    ingredients='';
    recipes=[];

    // method to get back into the main page
    handleBack()
    {
        this.exploreRecipe =false;
        this.recipes=[];
    }
    // method to load the search recipe page
    handleExploreRecipe()
    {
        this.exploreRecipe = true;
    }
    // method to search reipe followed  by inpute
    fetchRecipebyIngridients()
    {
        console.log('fetchRecipebyIngridients');
        const ingredients = this.template.querySelector('.ingridient-input').value;
        // imperative call to apex method
        getRecipeByIngredients({ingredients})
        .then(result=>{
            this.recipes = result;
            console.log('data recieved sucessfully'+this.recipes);
            this.recipes=JSON.parse(result);
        })
        .catch(error=>{
            this.error=error;
            console.log('error in fetching data');
        });
    }
     // method to load random recipe
    fetchrandonRecipe()
    {
        console.log('fetchrandonRecipe');
        getrandomRecipe()
        .then(result=>{
            this.recipes = result;
            console.log(' random data recieved sucessfully'+ this.recipes);
            const recipesData = JSON.parse(result);
            if(recipesData && recipesData.recipes && recipesData.recipes.length > 0)
            {
                const recipe = recipesData.recipes[0];
                // Converts raw ingredient objects into display-friendly strings(amount1 unitCup nameOfFood)
                const ingredients = recipe.extendedIngredients.map(ingridient=>{return`${ingridient.amount} ${ingridient.unit} ${ingridient.name}`;});
                this.ingredients = ingredients;
                this.recipes = recipesData.recipes;
                console.log('if block executed');
            }
            else if(recipesData.recipes=null)
            {
                console.log('no data found');
            }
            })
        .catch(error=>{
            this.error=error;  
            console.log('error in fetching  random  data');
        });    
    }
}