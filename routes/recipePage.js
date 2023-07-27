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

module.exports = router;