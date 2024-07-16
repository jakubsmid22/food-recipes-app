const recipesContainer = document.getElementById("recipe");
const searchMealForm = document.getElementById("searchMealForm");
const mealInput = document.getElementById("meal");
const recipeTemplate = document.getElementById("recipeTemplate").content;
const recipeModal = document.getElementById("recipeModal");
const modalName = document.getElementById("modalName");
const modalCategory = document.getElementById("modalCategory");
const modalArea = document.getElementById("modalArea");
const modalImg = document.getElementById("modalImg");
const instructions = document.getElementById("instructions");
const modalClose = document.querySelectorAll("[data-modal-close]");

searchMealForm.addEventListener("submit", (e) => {
    e.preventDefault();

    recipesContainer.innerHTML = "";

    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealInput.value)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  })
  .then(data => {

    if (!data.meals) {
        alert("Meal not found.");
        return;
    }

    data.meals.forEach(e => {
        const {idMeal, strArea, strInstructions, strCategory, strMeal, strMealThumb} = e;
        const meal = recipeTemplate.cloneNode(true);
        const img = meal.getElementById("recipe-img");
        const name = meal.getElementById("name");
        const category = meal.getElementById("category");
        const area = meal.getElementById("area");
        const btn = meal.getElementById("viewRecipe");

        img.src = strMealThumb;
        name.textContent = strMeal;
        category.textContent = strCategory;
        area.textContent = strArea;
        meal.key = idMeal;
        recipesContainer.append(meal);

        btn.addEventListener("click", () => {
            modalName.textContent = strMeal;
            modalCategory.textContent = strCategory;
            modalArea.textContent = strArea;
            modalImg.src = strMealThumb;
            instructions.textContent = strInstructions;
            recipeModal.showModal();
        });
    })
})
  .catch(err => {
    console.error(err);
  });

});

modalClose.forEach(e => {
    e.addEventListener("click", () => {
        recipeModal.close();
    });
})