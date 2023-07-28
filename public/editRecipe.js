function editRecipeName(recipe_id) {
    const newTitle = prompt("Enter the new recipe name:");
    if (newTitle !== null && newTitle.trim() !== "") {
      fetch(`/recipe/${recipe_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      })
        .then((response) => response.json())
        .then((data) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating recipe name:", error);
          alert("Something went wrong while updating the recipe name.");
        });
    }
  }
  
  function editRecipeInstructions(recipe_id) {
    const newInstructions = prompt("Enter the new recipe instructions:");
    if (newInstructions !== null && newInstructions.trim() !== "") {
      fetch(`/recipe/${recipe_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ instructions: newInstructions }),
      })
        .then((response) => response.json())
        .then((data) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating recipe instructions:", error);
          alert("Something went wrong while updating the recipe instructions.");
        });
    }
  }