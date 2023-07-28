document.getElementById('addIngredient').addEventListener('click', function() {
    var div = document.createElement('div');
    div.innerHTML = '<label>Ingredient Name: </label><input type="text" name="ingredientName[]" required> \
                     <label>Quantity: </label><input type="text" name="quantity[]" required>';
    document.getElementById('ingredients').appendChild(div);
});