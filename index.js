const recipesContainer = document.getElementById("recipe");
const searchMealForm = document.getElementById("searchMealForm");
const mealInput = document.getElementById("meal");
const recipeTemplate = document.getElementById("recipeTemplate").content;

searchMealForm.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealInput.value)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  })
  .then(data => {
    data.meals.forEach(e => {
        const {idMeal, strArea, strCategory, strMeal, strMealThumb} = e;
        const meal = recipeTemplate.cloneNode(true);
        const img = meal.getElementById("recipe-img");
        const name = meal.getElementById("name");
        const category = meal.getElementById("category");
        const area = meal.getElementById("area");

        img.src = strMealThumb;
        name.textContent = strMeal;
        category.textContent = strCategory;
        area.textContent = strArea;
        meal.key = idMeal;
        recipesContainer.append(meal);
    })
})
  .catch(err => {
    console.error(err);
  });

});