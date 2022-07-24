const mongoose = require('mongoose');
const { stringify } = require('uuid');

const Schema = mongoose.Schema;
const constants = require('../utils/constants');

function transform(ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.status;
}
var options = {
  toObject: {
    virtuals: true,
    transform: function (doc, ret) {
      transform(ret);
    },
  },
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      transform(ret);
    },
  },
};
const recipeSchema = new Schema(
  {
  
    title:String,
    category:String,
    author:String,
    description:String,
    image: [{
      type: String,
     }],
    ingredients: String,
    status:Number,
  },
  {
    timestamps: true,
  },

);

const recipe = mongoose.model('Recipe', recipeSchema,'Recipes');

module.exports = recipe;
