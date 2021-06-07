"use strict";
exports.__esModule = true;
exports.UserModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var UserModel = /** @class */ (function () {
    function UserModel() {
        this.createSchema();
        this.createModel();
    }
    UserModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            userId: String,
            email: String,
            isPremium: Boolean,
            favoriteList: [],
            recentlyView: [],
            ssoID: { type: String, required: true, unique: true }
        }, { collection: 'users' });
    };
    ;
    UserModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("users", this.schema);
    };
    // Get all users
    UserModel.prototype.retrieveAllUsers = function (response) {
        var query = this.model.find({});
        query.exec(function (err, userArray) {
            response.json(userArray);
        });
    };
    // Retrieve user
    UserModel.prototype.retrieveUser = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, innerUser) {
            if (err) {
                console.log('error retrieving user');
            }
            else {
                if (innerUser == null) {
                    response.status(404);
                    response.json('Bad Request');
                }
                else {
                    console.log('Found!');
                    response.json(innerUser);
                }
            }
        });
    };
    ;
    // Update user
    UserModel.prototype.updateUser = function (response, filter, userId) {
        var query = this.model.findOne({ userId: userId });
        query.exec(function (err, innerUser) {
            if (err) {
                console.log('error retrieving review');
            }
            else {
                if (innerUser == null) {
                    response.status(404);
                    response.json('Bad Request');
                }
                else {
                    innerUser.overwrite(filter);
                    innerUser.save(function (err) {
                        if (err) {
                            response.send(err);
                        }
                        response.json("Review #" + innerUser.reviewId + ' was updated.');
                    });
                }
            }
        });
    };
    // Delete user
    UserModel.prototype.deleteUser = function (response, userId) {
        this.model.findOneAndDelete(userId, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                response.status(200).send('User deleted');
            }
        });
    };
    // Add favorite list
    UserModel.prototype.addToFavoriteList = function (response, UserId, RecipeId) {
        var isExisted = false;
        var query = this.model.findOne({ userId: UserId });
        query.exec(function (err, innerUser) {
            if (err) {
                console.log('error retrieving user');
            }
            else {
                if (innerUser == null) {
                    response.status(404);
                    response.json('Bad Request!');
                }
                else {
                    console.log('favoriteList is:' + innerUser.favoriteList);
                    for (var i = 0; i < innerUser.favoriteList.length; i++) {
                        if (innerUser.favoriteList[i] == RecipeId) {
                            isExisted = true;
                            break;
                        }
                    }
                    if (isExisted === false) {
                        console.log('Added to favorite List!');
                        innerUser.favoriteList.push(RecipeId);
                        innerUser.save(function (err) {
                            if (err) {
                                response.send(err);
                            }
                            response.json(RecipeId + ' is added to favorite List!');
                        });
                    }
                    else {
                        response.json('Duplicate!');
                    }
                }
            }
        });
    };
    ;
    // Remove a recipe from favorite list
    UserModel.prototype.removeFromFavoriteList = function (response, UserId, RecipeId) {
        var isExisted = false;
        var query = this.model.findOne({ userId: UserId });
        query.exec(function (err, innerUser) {
            if (err) {
                console.log('error retrieving user');
            }
            else {
                if (innerUser == null) {
                    response.status(404);
                    response.json('Bad Request!');
                }
                else {
                    console.log('favoriteList is:' + innerUser.favoriteList);
                    for (var i = 0; i < innerUser.favoriteList.length; i++) {
                        if (innerUser.favoriteList[i] == RecipeId) {
                            isExisted = true;
                            console.log('removing from favorite List!');
                            innerUser.favoriteList.splice(i, RecipeId);
                            innerUser.save(function (err) {
                                if (err) {
                                    response.send(err);
                                }
                                response.json(RecipeId + ' is removed from favorite List!');
                            });
                            break;
                        }
                    }
                    if (isExisted === false) {
                        console.log('Not found in User favorite List!');
                        response.status(404);
                        response.json('Bad Request!');
                    }
                }
            }
        });
    };
    ;
    // Get favorite list
    UserModel.prototype.getFavoriteList = function (response, UserId, recipeModel) {
        var query = this.model.findOne({ userId: UserId });
        query.exec(function (err, innerUser) {
            if (err) {
                console.log('error retrieving user');
            }
            else {
                if (innerUser == null) {
                    response.status(404);
                    response.json('Bad Request');
                }
                else {
                    console.log('Found!');
                    recipeModel.passFavoriteList(response, innerUser.favoriteList);
                }
            }
        });
    };
    ;
    // Remove favorite list
    UserModel.prototype.removeFavoriteList = function (response, UserId, RecipeId) {
        var query = this.model.findOne({ UserId: UserId });
        query.exec(function (err, innerUser) {
            if (err) {
                console.log('error retrieving user');
            }
            else {
                if (innerUser == null) {
                    response.status(404);
                    response.json('Bad Request');
                }
                else {
                    console.log('Found!');
                    query.innerUser.favoritList.filter(function (item) { return item.id !== RecipeId; });
                    response.json(innerUser.favoritList);
                }
            }
        });
    };
    ;
    return UserModel;
}());
exports.UserModel = UserModel;
