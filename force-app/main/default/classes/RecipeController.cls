
global with sharing class RecipeController {
    private static final String RECIPE_API= 'https://api.spoonacular.com';
    private static final String API_KEY= '576732037bea472eab158dc6b69e9145';

    @AuraEnabled

    public static string getrandomRecipe()
    {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setMethod('GET');
        request.setEndpoint(RECIPE_API+'/recipes/random?apiKey='+ API_KEY);
        HttpResponse response = http.send(request);
        if(response.getStatusCode() == 200){
            return response.getBody();
        }
        return ' ';
    }
    
    @AuraEnabled
    public static string  getRecipe(String recipeId)   
    {
        if (recipeId.endsWith('.0'))
        {
            recipeId = recipeId.substring(0, recipeId.length() - 2);
        }
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(RECIPE_API+'/recipes/'+recipeId+'/information?apiKey='+ API_KEY);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if(response.getStatusCode() == 200){
            return response.getBody();
        }
        return ' ';
    }
    
    @AuraEnabled
    public static String getRecipeByIngredients(String ingredients)
    {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setMethod('GET');
        request.setEndpoint(RECIPE_API+'/recipes/findByIngredients?ingredients='+ingredients+'&number=10&apiKey='+API_KEY);
        HttpResponse response = http.send(request);
        if(response.getStatusCode() == 200){
            return response.getBody();
        }
        return ' ';
    }
}
