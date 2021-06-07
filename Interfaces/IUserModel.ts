import Mongoose = require("mongoose");


interface IUsereModel extends Mongoose.Document {
    userID: String;
    email: String;
    isPremium: boolean;
    favoritList:string[];
    recentlyView:string[];
    ssoID: {type: String, required: true, unique: true},
}
export {IUsereModel};

