"use strict";
exports.__esModule = true;
exports.IngredientModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var IngredientModel = /** @class */ (function () {
    function IngredientModel() {
        this.createSchema();
        this.createModel();
    }
    IngredientModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            ingredientName: []
        }, { collection: 'ingredients' });
    };
    ;
    IngredientModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("ingredients", this.schema);
    };
    // Get all recipes
    IngredientModel.prototype.retrieveIngredients = function (response) {
        var query = this.model.find({});
        query.exec(function (err, ingredientArray) {
            response.json(ingredientArray);
        });
    };
    return IngredientModel;
}());
exports.IngredientModel = IngredientModel;
