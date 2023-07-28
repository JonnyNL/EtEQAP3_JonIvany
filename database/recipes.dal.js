const db = require('./db.js');

const DEBUG = true;

var getAuthor = function(author_id) {
    if(DEBUG) console.log(`recipes.dal.getAuthor(${author_id})`);
    return new Promise(function(resolve, reject) {
        const sql = "SELECT * FROM authors WHERE author_id = $1";
        db.query(sql, [author_id], (err, result) => {
            if (err) {
                if(DEBUG) console.log(err);
                reject(err);
            } else {
                resolve(result.rows[0]);
            }
        });
    });
};

var getIngredients = function(recipe_id) {
    if(DEBUG) console.log(`recipes.dal.getIngredients(${recipe_id})`);
    return new Promise(function(resolve, reject) {
        const sql = "SELECT * FROM ingredients WHERE recipe_id = $1";
        db.query(sql, [recipe_id], (err, result) => {
            if (err) {
                if(DEBUG) console.log(err);
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
};

var getAllRecipes = function() {
    if(DEBUG) console.log("recipes.dal.getAllRecipes()");
    return new Promise(function(resolve, reject) {
        const sql = "SELECT * FROM recipes";
        db.query(sql, [], async (err, result) => {
            if (err) {
                if(DEBUG) console.log(err);
                reject(err);
            } else {
                let recipes = result.rows;
                for (let i = 0; i < recipes.length; i++) {
                    let recipe = recipes[i];
                    recipe.author = await getAuthor(recipe.author_id);
                    recipe.ingredients = await getIngredients(recipe.recipe_id);
                }
                resolve(recipes);
            }
        });
    });
};

var deleteRecipe = function(recipe_id) {
    if(DEBUG) console.log(`recipes.dal.deleteRecipe(${recipe_id})`);
    return new Promise(function(resolve, reject) {
        const sqlIngredients = "DELETE FROM ingredients WHERE recipe_id = $1";
        db.query(sqlIngredients, [recipe_id], (err, result) => {
            if (err) {
                if(DEBUG) console.log(err);
                reject(err);
            } else {
                const sqlRecipe = "DELETE FROM recipes WHERE recipe_id = $1";
                db.query(sqlRecipe, [recipe_id], (err, result) => {
                    if (err) {
                        if(DEBUG) console.log(err);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
        });
    });
};

var insertAuthor = function (name) {
    return new Promise(function (resolve, reject) {
      const sql = "INSERT INTO authors (name) VALUES ($1) RETURNING author_id, name";
      db.query(sql, [name], (err, result) => {
        if (err) {
          if (DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
};

// For some reason recipe id is not auto incrementing so I will have to try to manually increment it
const getMaxRecipeId = function () {
    return new Promise(function (resolve, reject) {
      const sql = "SELECT MAX(recipe_id) as max_id FROM recipes";
      db.query(sql, [], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows[0].max_id || 0); // If there are no records, use 0 as the starting ID
        }
      });
    });
  };
  
  var insertRecipe = async function (title, instructions, author_id) {
    try {
      const maxRecipeId = await getMaxRecipeId();
      const newRecipeId = maxRecipeId + 1;
      const sql = "INSERT INTO recipes (recipe_id, title, instructions, author_id) VALUES ($1, $2, $3, $4) RETURNING *";
      return new Promise(function (resolve, reject) {
        db.query(sql, [newRecipeId, title, instructions, author_id], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.rows[0]);
          }
        });
      });
    } catch (err) {
      throw err;
    }
  };

// ingredient id is also not auto incrementing so I will have to manuall do that as well
const getMaxIngredientId = function () {
    return new Promise(function (resolve, reject) {
      const sql = "SELECT MAX(ingredient_id) as max_id FROM ingredients";
      db.query(sql, [], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows[0].max_id || 0); // If there are no records, use 0 as the starting ID
        }
      });
    });
  };
  
  var insertIngredient = async function (name, quantity, recipe_id) {
    try {
      const maxIngredientId = await getMaxIngredientId();
      const newIngredientId = maxIngredientId + 1;
      const sql = "INSERT INTO ingredients (ingredient_id, name, quantity, recipe_id) VALUES ($1, $2, $3, $4) RETURNING *";
      return new Promise(function (resolve, reject) {
        db.query(sql, [newIngredientId, name, quantity, recipe_id], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.rows[0]);
          }
        });
      });
    } catch (err) {
      throw err;
    }
  };

module.exports = {
    getAllRecipes,
    deleteRecipe,
    insertIngredient,
    insertRecipe,
    insertAuthor,
};