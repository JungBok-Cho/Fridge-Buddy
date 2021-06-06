import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IIngredientModel} from '../Interfaces/IIngredientModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class IngredientModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
        
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema({
            ingredientName: []
        }, { collection: 'ingredients' });
        
    };

    public createModel(): void {
        this.model = mongooseConnection.model<IIngredientModel>("ingredients", this.schema);
    }

    // Get all recipes
    public retrieveIngredients(response:any): any {
        var query = this.model.find({});
        query.exec( (err, ingredientArray) => {
            response.json(ingredientArray) ;
        });
    }

}
export {IngredientModel};

