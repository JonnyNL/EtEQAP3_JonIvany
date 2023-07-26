/*My Recipe website will consist of 3 tables, to simplify users I've just added an author option which I will later use for filtering results.*/
CREATE DATABASE RecipeSite;
/*The author table is a simple way to display who created a what recipe, it has a one to many relationship with recipes as a single author can write multiple recipes and the recipe is uniquely theirs*/
CREATE TABLE Authors(
   author_id SERIAL PRIMARY KEY,
   name VARCHAR(100) NOT NULL
);
/*The Recipes table defines the unique recipe id, recipe name, instructions to make the recipe, the publishing author, and the date of publishing. It also features a one to many relationship with ingredients as a recipe can have multiple ingredients*/
CREATE TABLE Recipes(
   recipe_id SERIAL PRIMARY KEY,
   title VARCHAR(100) NOT NULL,
   instructions TEXT NOT NULL,
   author_id INT REFERENCES Authors(author_id),
   published_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
/*The ingredients table defines the unique ingredient id, the name of the ingredient, the amount needed of that ingredient, and what recipe the quantity of that ingredient belongs to*/
CREATE TABLE Ingredients(
   ingredient_id SERIAL PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   quantity VARCHAR(100) NOT NULL,
   recipe_id INT REFERENCES Recipes(recipe_id)
);