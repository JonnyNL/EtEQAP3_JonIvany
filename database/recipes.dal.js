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

module.exports = {
    getAllRecipes,
};