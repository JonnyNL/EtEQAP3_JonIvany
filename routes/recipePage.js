const express = require('express');
const router = express.Router();
const db = require('../database/recipes.dal');

// GET route to retrieve all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await db.getAllRecipes(); 
    res.render('recipePage', { recipes: recipes });
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});

// DELETE route to delete a specific recipe
router.delete('/:id', async (req, res) => {
    try {
      await db.deleteRecipe(req.params.id);
      res.redirect('/');
    } catch (err) {
      console.error(err.stack);
      res.status(500).send('Something went wrong!');
    }
});

// GET route to search for recipes
router.get('/search', async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const recipes = await db.searchRecipes(keyword); // Implement the search function in recipe.dal.js
    res.render('searchResults', { keyword, recipes });
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});

router.get('/new', (req, res) => {
  res.render('newRecipe');
});

router.post('/new', async (req, res) => {
  try {
      const { authorName, recipeTitle, recipeInstructions, ingredientName, quantity } = req.body;
      // Insert the new author and get the result
      const author = await db.insertAuthor(authorName);
      // Insert the new recipe and get the result
      const recipe = await db.insertRecipe(recipeTitle, recipeInstructions, author.author_id);
      // Insert each ingredient
      for (let i = 0; i < ingredientName.length; i++) {
          await db.insertIngredient(ingredientName[i], quantity[i], recipe.recipe_id);
      }
      // Redirect to the main page
      res.redirect('/recipe');
  } catch (err) {
      console.error(err.stack);
      res.status(500).send('Something went wrong!');
  }
});

module.exports = router;