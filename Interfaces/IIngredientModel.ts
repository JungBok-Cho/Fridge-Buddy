import Mongoose = require("mongoose");


interface IIngredientModel extends Mongoose.Document {
    ingredientName: string[];
}
export {IIngredientModel};