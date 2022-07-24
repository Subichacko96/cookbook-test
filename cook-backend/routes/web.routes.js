const WebRouter = require('express').Router();

const web = require('../controllers/web.controllers');

  WebRouter.route('/list/all').get(
    
    web.listAllRecipe
  );
  
  WebRouter.route('/list/allcategory').get(
    
    web.listCategory
  );

  WebRouter.route('/list/recicategory/').get(

    web.listReciCategory
  );

  WebRouter.route('/singleRecipe/:id').get(
  
    web.getSingleReciDetail
 );





module.exports = WebRouter;
