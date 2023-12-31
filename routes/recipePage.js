const express = require('express');
const router = express.Router();
const db = require('../database/recipes.dal');

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

router.get('/recipe/new', (req, res) => {
  res.render('newRecipe');
});

router.post('/recipe/new', async (req, res) => {
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
      res.redirect('/');
  } catch (err) {
      console.error(err.stack);
      res.status(500).send('Something went wrong!');
  }
});

// PUT route to update the recipe name
router.put('/recipe/:id', async (req, res) => {
  try {
    const { title } = req.body;
    await db.updateRecipeName(req.params.id, title);
    res.json({ message: "Recipe name updated successfully" });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// PATCH route to update the recipe instructions
router.patch('/recipe/:id', async (req, res) => {
  try {
    const { instructions } = req.body;
    await db.updateRecipeInstructions(req.params.id, instructions);
    res.json({ message: "Recipe instructions updated successfully" });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

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

router.get('/recipes', async (req, res) => {
  try {
    const recipes = await db.getAllRecipes();
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});

// GET route to retrieve a specific author by their ID
router.get('/author/:id', async (req, res) => {
  try {
    const author = await db.getAuthorById(req.params.id);
    res.json(author);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});

// GET route to retrieve a specific ingredient by its ID
router.get('/ingredient/:id', async (req, res) => {
  try {
    const ingredient = await db.getIngredientById(req.params.id);
    res.json(ingredient);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});

// GET route to retrieve a specific recipe by its ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await db.getRecipeById(req.params.id);
    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});



module.exports = router;
