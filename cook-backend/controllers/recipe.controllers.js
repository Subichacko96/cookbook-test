const Recipe = require("../models/recipe.models");

var ObjectId = require("mongoose").Types.ObjectId;

exports.createRecipe = async (req, res) => {

  let params = req.body;
 
   let imgFiles = req.files;
  //console.log(params, "👲");

  if (
    !params.title ||
    !params.category ||
    !imgFiles || imgFiles.length===0||
    !params.description ||
    !params.author ||
    !params.ingredients
   
  ) {
    var msg = "";
    if (!params.name) {
      msg = " name cannot be empty";
    } else if (!params.content) {
      msg = "description cannot be empty";
    } 
    else if (!imgFiles || imgFiles.length===0) {
      msg = "image cannot be empty";
    } 
    else if (!params.author) {
      msg = "author cannot be empty";
    } else if (!params.category) {
      msg = "category cannot be empty";
    } else if (!params.ingredients||ingredients.length===0) {
      msg = "ingredients cannot be empty";
    }
    return res.send({
      msg,
      statusCode: 400,
      error: true,
      data: null,
    });
  }



  let recObj = {
    
    title: params.title,
    category:params.category,
    author: params.author,
    description: params.description,
    image: imgFiles.map(file=>{
      return file.filename
    }
      ),
    ingredients: params.ingredients,
    
    status: 1,
  };
  console.log(recObj, "🤶");
  let newRecObj = new Recipe(recObj);
  let newRecData = await newRecObj.save().catch((error) => {
    console.log(error);
    return {
      msg: "Something went wrong while getting service count",
      statusCode: 400,
      error: true,
      data: null,
    };
  });
  if (newRecData && newRecData.error !== undefined && newRecData.error) {
    return res.send(newRecData);
  }
  return res.send({
    msg: "Recipe created successfully ",
    statusCode: 200,
    auth: true,
    error: false,
    data: null,
  });
};

exports.listRecipe = async (req, res) => {
  // let coOrdinatorId = req.user.id;
 
   let params = req.query;
   let findCriteria = {
    
     status: 1,
   };
 
   let recipeList = await Recipe.find(findCriteria)
     .sort({
       createdAt: -1,
     })
     .catch((error) => {
       console.log(error);
       return {
         msg: "Something went wrong while listing News",
         statusCode: 400,
         error: true,
         data: null,
       };
     });
   if (recipeList && recipeList.error !== undefined && recipeList.error) {
     return res.send(recipeList);
   }

   let data = {
     items: recipeList,
   };
   return res.send({
     data,
     msg: "Recipe list",
     statusCode: 200,
     error: false,
   });
 };

 exports.getRecipeDetail = async (req, res) => {
  // let coOrdinatorId = req.user.id;
  let recipeId = req.params.id;

  let isValidId = ObjectId.isValid(recipeId);
  if (!isValidId) {
    return res.send({
      msg: "recipeId is invalid",
      statusCode: 400,
      error: true,
      data: null,
    });
  }
  let findCriteria = {
    _id: recipeId,
    // coOrdinatorId,
    status: 1,
  };
  var RecipeData = await Recipe.findOne(findCriteria).catch((error) => {
    console.log(error);
    return {
      msg: "Something went wrong while checking Recipe data",
      statusCode: 400,
      error: true,
      data: null,
    };
  });
  if (RecipeData && RecipeData.error !== undefined && RecipeData.error) {
    return res.send(RecipeData);
  }
  if (RecipeData) {
    return res.send({
      msg: "Recipe fetch susccessfully",
      data: RecipeData,
      statusCode: 200,
      error: false,
    });
  } else {
    return res.send({
      msg: "No Recipe Detail",
      statusCode: 400,
      error: true,
      data: null,
    });
  }
};