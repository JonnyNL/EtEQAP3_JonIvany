const db = require('./db.js');

const DEBUG = true;

// Function to fetch an author by their ID from the database
var getAuthor = function(author_id) {
    if (DEBUG) console.log(`Fetching author with ID: ${author_id}`);
    return new Promise(function(resolve, reject) {
        // SQL query to fetch the author from the 'authors' table based on the given author_id
        const sql = "SELECT * FROM authors WHERE author_id = $1";
        db.query(sql, [author_id], (err, result) => {
            if (err) {
                // If there is an error, reject the promise with the error
                if (DEBUG) console.log(err);
                reject(err);
            } else {
                // If successful, resolve the promise with the fetched author data
                resolve(result.rows[0]);
            }
        });
    });
};

// Function to fetch ingredients for a recipe by its ID from the database
var getIngredients = function(recipe_id) {
    if (DEBUG) console.log(`Fetching ingredients for recipe with ID: ${recipe_id}`);
    return new Promise(function(resolve, reject) {
        // SQL query to fetch the ingredients from the 'ingredients' table based on the given recipe_id
        const sql = "SELECT * FROM ingredients WHERE recipe_id = $1";
        db.query(sql, [recipe_id], (err, result) => {
            if (err) {
                // If there is an error, reject the promise with the error
                if (DEBUG) console.log(err);
                reject(err);
            } else {
                // If successful, resolve the promise with the fetched ingredients data
                resolve(result.rows);
            }
        });
    });
};

// Function to fetch all recipes from the database along with their authors and ingredients
var getAllRecipes = async function () {
  if (DEBUG) console.log("Fetching all recipes");
  try {
    // SQL query to fetch all recipes from the 'recipes' table
    const result = await db.query("SELECT * FROM recipes");
    let recipes = result.rows;

    // Use Promise.all to fetch authors and ingredients in parallel
    const fetchAuthorsPromises = recipes.map(recipe => getAuthor(recipe.author_id));
    const fetchIngredientsPromises = recipes.map(recipe => getIngredients(recipe.recipe_id));
    const authors = await Promise.all(fetchAuthorsPromises);
    const ingredients = await Promise.all(fetchIngredientsPromises);

    // Assign authors and ingredients to respective recipes
    for (let i = 0; i < recipes.length; i++) {
      recipes[i].author = authors[i];
      recipes[i].ingredients = ingredients[i];
    }

    // After all recipes are processed, resolve the promise with the complete list of recipes
    return recipes;
  } catch (err) {
    // If there is an error at any point, reject the promise with the error
    if (DEBUG) console.log(err);
    throw err;
  }
};

// Function to delete a recipe from the database by its ID
var deleteRecipe = function(recipe_id) {
    if (DEBUG) console.log(`Deleting recipe with ID: ${recipe_id}`);
    return new Promise(function(resolve, reject) {
        // SQL query to delete ingredients associated with the given recipe_id
        const sqlIngredients = "DELETE FROM ingredients WHERE recipe_id = $1";
        db.query(sqlIngredients, [recipe_id], (err, result) => {
            if (err) {
                // If there is an error, reject the promise with the error
                if (DEBUG) console.log(err);
                reject(err);
            } else {
                // If ingredients are deleted successfully, delete the recipe from the 'recipes' table
                const sqlRecipe = "DELETE FROM recipes WHERE recipe_id = $1";
                db.query(sqlRecipe, [recipe_id], (err, result) => {
                    if (err) {
                        // If there is an error, reject the promise with the error
                        if (DEBUG) console.log(err);
                        reject(err);
                    } else {
                        // If the recipe is deleted successfully, resolve the promise
                        resolve();
                    }
                });
            }
        });
    });
};

// Function to insert a new author into the database
var insertAuthor = function (name) {
    return new Promise(function (resolve, reject) {
        if (DEBUG) console.log(`Inserting new author with name: ${name}`);
        const sql = "INSERT INTO authors (name) VALUES ($1) RETURNING author_id, name";
        db.query(sql, [name], (err, result) => {
            if (err) {
                // If there is an error, reject the promise with the error
                if (DEBUG) console.log(err);
                reject(err);
            } else {
                // If successful, resolve the promise with the inserted author data
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

  var searchRecipes = function (keyword) {
    return new Promise(function (resolve, reject) {
      const sql = `
        SELECT * FROM recipes
        WHERE 
          title ILIKE $1 OR
          EXISTS (SELECT 1 FROM authors WHERE authors.author_id = recipes.author_id AND name ILIKE $1) OR
          EXISTS (SELECT 1 FROM ingredients WHERE ingredients.recipe_id = recipes.recipe_id AND name ILIKE $1)
      `;
      db.query(sql, [`%${keyword}%`], async (err, result) => {
        if (err) {
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

  // Function to update the name of a recipe in the database
var updateRecipeName = function (recipe_id, title) {
  if (DEBUG) console.log(`Updating recipe name with ID: ${recipe_id} to "${title}"`);
  return new Promise(function (resolve, reject) {
      // SQL query to update the 'title' column of the recipe with the given recipe_id
      const sql = "UPDATE recipes SET title = $1 WHERE recipe_id = $2 RETURNING *";
      db.query(sql, [title, recipe_id], (err, result) => {
          if (err) {
              // If there is an error, reject the promise with the error
              if (DEBUG) console.log(err);
              reject(err);
          } else {
              // If the recipe title is updated successfully, resolve the promise with the updated recipe data
              resolve(result.rows[0]);
          }
      });
  });
};

// Function to update the instructions of a recipe in the database
var updateRecipeInstructions = function (recipe_id, instructions) {
  if (DEBUG) console.log(`Updating recipe instructions with ID: ${recipe_id} to "${instructions}"`);
  return new Promise(function (resolve, reject) {
      // SQL query to update the 'instructions' column of the recipe with the given recipe_id
      const sql = "UPDATE recipes SET instructions = $1 WHERE recipe_id = $2 RETURNING *";
      db.query(sql, [instructions, recipe_id], (err, result) => {
          if (err) {
              // If there is an error, reject the promise with the error
              if (DEBUG) console.log(err);
              reject(err);
          } else {
              // If the recipe instructions are updated successfully, resolve the promise with the updated recipe data
              resolve(result.rows[0]);
          }
      });
  });
};

// Function to fetch a recipe by its ID from the database
var getRecipeById = function(recipe_id) {
  if (DEBUG) console.log(`Fetching recipe with ID: ${recipe_id}`);
  return new Promise(function(resolve, reject) {
      // SQL query to fetch the recipe from the 'recipes' table based on the given recipe_id
      const sql = "SELECT * FROM recipes WHERE recipe_id = $1";
      db.query(sql, [recipe_id], (err, result) => {
          if (err) {
              // If there is an error, reject the promise with the error
              if (DEBUG) console.log(err);
              reject(err);
          } else {
              // If successful, resolve the promise with the fetched recipe data
              resolve(result.rows[0]);
          }
      });
  });
};

// Function to fetch an author by their ID from the database
var getAuthorById = function(author_id) {
  if (DEBUG) console.log(`Fetching author with ID: ${author_id}`);
  return new Promise(function(resolve, reject) {
      // SQL query to fetch the author from the 'authors' table based on the given author_id
      const sql = "SELECT * FROM authors WHERE author_id = $1";
      db.query(sql, [author_id], (err, result) => {
          if (err) {
              // If there is an error, reject the promise with the error
              if (DEBUG) console.log(err);
              reject(err);
          } else {
              // If successful, resolve the promise with the fetched author data
              resolve(result.rows[0]);
          }
      });
  });
};

// Function to fetch an ingredient by its ID from the database
var getIngredientById = function(ingredient_id) {
  if (DEBUG) console.log(`Fetching ingredient with ID: ${ingredient_id}`);
  return new Promise(function(resolve, reject) {
      // SQL query to fetch the ingredient from the 'ingredients' table based on the given ingredient_id
      const sql = "SELECT * FROM ingredients WHERE ingredient_id = $1";
      db.query(sql, [ingredient_id], (err, result) => {
          if (err) {
              // If there is an error, reject the promise with the error
              if (DEBUG) console.log(err);
              reject(err);
          } else {
              // If successful, resolve the promise with the fetched ingredient data
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
    searchRecipes,
    updateRecipeName,
    updateRecipeInstructions,
    getRecipeById,
    getAuthorById,
    getIngredientById,
};