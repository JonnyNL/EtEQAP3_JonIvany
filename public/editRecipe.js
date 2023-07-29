// Function to edit the name of a recipe
function editRecipeName(recipe_id) {
    // Prompt the user to enter the new recipe name
    const newTitle = prompt("Enter the new recipe name:");

    // Check if the user entered a valid non-empty recipe name
    if (newTitle !== null && newTitle.trim() !== "") {
        // Make a PUT request to update the recipe name on the server
        fetch(`/home/recipe/${recipe_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: newTitle }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Reload the page after successful update
                console.log(`Editing recipe name with ID: ${recipe_id} to "${newTitle}"`);
                window.location.reload();
            })
            .catch((error) => {
                // Log and display an error message if the update fails
                console.error("Error updating recipe name:", error);
                alert("Something went wrong while updating the recipe name.");
            });
    }
}

// Function to edit the instructions of a recipe
function editRecipeInstructions(recipe_id) {
    // Prompt the user to enter the new recipe instructions
    const newInstructions = prompt("Enter the new recipe instructions:");

    // Check if the user entered valid non-empty recipe instructions
    if (newInstructions !== null && newInstructions.trim() !== "") {
        // Make a PATCH request to update the recipe instructions on the server
        fetch(`/home/recipe/${recipe_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ instructions: newInstructions }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Reload the page after successful update
                console.log(`Editing recipe instructions with ID: ${recipe_id} to "${newInstructions}"`);
                window.location.reload();
            })
            .catch((error) => {
                // Log and display an error message if the update fails
                console.error("Error updating recipe instructions:", error);
                alert("Something went wrong while updating the recipe instructions.");
            });
    }
}