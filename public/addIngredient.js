// A script for my recipe publishing page that listens for the click of an additional ingredient button and adds a new
// ingredient input field to the form.

document.getElementById('addIngredient').addEventListener('click', function() {
    var div = document.createElement('div');
    div.innerHTML = `<label>Ingredient Name: </label><input type="text" name="ingredientName[]" required>
                     <label>Quantity: </label><input type="text" name="quantity[]" required>
                     <button type="button" class="removeIngredient">x</button>`;
    document.getElementById('ingredients').appendChild(div);

    // Add a click event listener to the "x" button to remove the ingredient
    div.querySelector('.removeIngredient').addEventListener('click', function() {
        div.remove();
    });
});

document.getElementById('cancelButton').addEventListener('click', function() {
    window.location.href = '/'; // redirect to the main page
});