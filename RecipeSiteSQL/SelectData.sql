/*View all authors*/
Select * FROM Authors;

/*View all published recipes*/
SELECT * FROM Recipes;

/*View ingredients by recipe*/
SELECT * FROM Ingredients WHERE recipe_id = 1;

/*Select recipe by the author*/
SELECT * FROM Recipes WHERE author_id = (SELECT author_id FROM Authors WHERE name = 'John Doe');

/*View the recipe with the ingredients*/
SELECT R.title, I.name, I.quantity FROM Recipes R INNER JOIN Ingredients I ON R.recipe_id = I.recipe_id;

/*View the authors with their published recipes*/
SELECT A.name, R.title FROM Authors A INNER JOIN Recipes R ON A.author_id = R.author_id;

