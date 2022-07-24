const Recipe = require("../models/recipe.models");
var ObjectId = require("mongoose").Types.ObjectId;


//  All 
exports.listAllRecipe = async (req, res) => {
  params = req.query;


  //list all news
  findCriteria = {
    // coOrdinatorId,
    status: 1,
  };

  let recipeListData = await Recipe.find(findCriteria)
    
    .sort({
      createdAt: -1,
    })
    .catch((error) => {
      console.log(error);
      return {
        msg: "Something went wrong while listing Recipe",
        statusCode: 400,
        error: true,
        data: null,
      };
    });
  if (recipeListData && recipeListData.error !== undefined && recipeListData.error) {
    return res.send(recipeListData);
  }


  

  let data = {
   
    allRecipe: recipeListData,
  };

  return res.send({
    data,
    msg: "Recipe list",
    statusCode: 200,
    error: false,
  });
};

exports.listCategory = async (req, res) => {
  //list cat
  let findCriteria = {
    status: 1,
  };
  let projection = {
    category: 1,
  };
  var allCategoryData = await Recipe.find(findCriteria, projection)
    .distinct("category")
    .catch((error) => {
      console.log(error);
      return {
        msg: "Something went wrong while checking Cat data",
        statusCode: 400,
        error: true,
        data: null,
      };
    });
    console.log(allCategoryData,"please sort array")
  if (
    allCategoryData &&
    allCategoryData.error !== undefined &&
    allCategoryData.error
  ) {
    return res.status(400).send(allCategoryData);
  }

  return res.send({
    msg: "Category fetch susccessfully",
    data: allCategoryData,
    statusCode: 200,
    error: false,
  });
};
//fetch reci basis of category
exports.listReciCategory = async (req, res) => {
  let categoryName = req.query.category;
  params = req.query;

  let findCriteria = {
    status: 1,
  };

  if (categoryName) {
    findCriteria = {
      category: categoryName,
      status: 1,
    };
  } else {
    findCriteria = {
      status: 1,
    };
  }

  var categoryData = await Recipe.find(findCriteria)
    .sort({ createdAt: -1 })
   
    .catch((error) => {
      console.log(error);
      return {
        msg: "Something went wrong while checking Cat data",
        statusCode: 400,
        error: true,
        data: null,
      };
    });

  if (categoryData && categoryData.error !== undefined && categoryData.error) {
    return res.status(400).send(categoryData);
  }
  

 
  let data = {
  
    allReci: categoryData,
  };
  return res.send({
    msg: "Category fetch susccessfully",
    data,
    statusCode: 200,
    error: false,
  });
};



//get single

exports.getSingleReciDetail = async (req, res) => {
  let reciId = req.params.id;

  let isValidId = ObjectId.isValid(reciId);
  if (!isValidId) {
    return res.send({
      msg: "reciId is invalid",
      statusCode: 400,
      error: true,
      data: null,
    });
  }
  let findCriteria = {
    _id: reciId,
    status: 1,
  };
  var singleReciData = await Recipe.findOne(findCriteria).catch((error) => {
    console.log(error);
    return {
      msg: "Something went wrong while checking Reci data",
      statusCode: 400,
      error: true,
      data: null,
    };
  });
  if (
    singleReciData &&
    singleReciData.error !== undefined &&
    singleReciData.error
  ) {
    return res.send(singleReciData);
  }
  if (singleReciData) {
    return res.send({
      msg: "Rec fetch susccessfully",
      data: singleReciData,
      statusCode: 200,
      error: false,
    });
  } else {
    return res.send({
      msg: "No Reci Detail",
      statusCode: 400,
      error: true,
      data: null,
    });
  }
};
