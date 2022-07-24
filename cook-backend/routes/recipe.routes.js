const RecipeRouter = require('express').Router();
const recipe = require('../controllers/recipe.controllers');
const UploadImage = require('../midlewares/fileUploadMiddleware')

RecipeRouter.route('/create').post(
   
   UploadImage,
  recipe.createRecipe
);
RecipeRouter.route('/list').get(
  recipe.listRecipe
  );

  RecipeRouter.route('/single/:id').get(
  
    recipe.getRecipeDetail
 );





module.exports = RecipeRouter;
