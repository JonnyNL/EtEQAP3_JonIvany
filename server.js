const express = require('express');
const serverHandling = require('./middleware/serverHandling');
const recipeDAL = require('./database/recipes.dal'); // require your data access layer
const app = express();

// Debugging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(serverHandling);

// Route to render the "Recipes" page using the "recipePage.ejs" template
app.get('/', async (req, res) => { // make this an async function
  try {
    const recipes = await recipeDAL.getAllRecipes(); // get all recipes
    res.render('recipePage', { recipes: recipes }); // pass recipes to the view
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));