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

var insertAuthor = function(name) {
    return new Promise(function(resolve, reject) {
        const sql = "INSERT INTO authors (name) VALUES ($1) RETURNING *";
        db.query(sql, [name], (err, result) => {
            if (err) {
                if(DEBUG) console.log(err);
                reject(err);
            } else {
                resolve(result.rows[0]);
            }
        });
    });
};

var insertRecipe = function(title, instructions, author_id) {
    return new Promise(function(resolve, reject) {
        const sql = "INSERT INTO recipes (title, instructions, author_id) VALUES ($1, $2, $3) RETURNING *";
        db.query(sql, [title, instructions, author_id], (err, result) => {
            if (err) {
                if(DEBUG) console.log(err);
                reject(err);
            } else {
                resolve(result.rows[0]);
            }
        });
    });
};

var insertIngredient = function(name, quantity, recipe_id) {
    return new Promise(function(resolve, reject) {
        const sql = "INSERT INTO ingredients (name, quantity, recipe_id) VALUES ($1, $2, $3) RETURNING *";
        db.query(sql, [name, quantity, recipe_id], (err, result) => {
            if (err) {
                if(DEBUG) console.log(err);
                reject(err);
            } else {
                resolve(result.rows[0]);
            }
        });
    });
};

module.exports = {
    getAllRecipes,
    deleteRecipe,
    insertIngredient,
    insertRecipe,
    insertAuthor,
};