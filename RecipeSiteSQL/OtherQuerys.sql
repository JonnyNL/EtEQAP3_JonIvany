/*Update a recipe name by the recipe ID*/
UPDATE Recipes SET title = 'Cheese Pizza' WHERE recipe_id = 1;

/*Update the quantity of ingredients by it's ID*/
UPDATE Ingredients SET quantity = '1.5 cups' WHERE ingredient_id = 2;

/*Update an Authors name by their author ID*/
UPDATE Authors SET name = 'John Smith' WHERE author_id = 1;

/*Delete an ingredient by it's id*/
DELETE FROM Ingredients WHERE ingredient_id = 2;

/*Delete a recipe by it's id*/
DELETE FROM Recipes WHERE recipe_id = 1;

/*Delete an author by it's id*/
DELETE FROM Authors WHERE author_id = 1;