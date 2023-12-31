const meals = document.getElementById("meals");
const favouriteContainer = document.getElementById("fav-meals");
const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');
getRandomMeal();
fetchFavMeals();


async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];
  console.log(randomMeal);
  addMeal(randomMeal, true);
}


async function getMealById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const respData = await resp.json();
  const meal =  respData.meals[0];
  return meal;
}


async function getMealBySearch(term) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + term
  );
  const respData = await resp.json();
  const meals = respData.meals;
  return meals;
}

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `  
    <div class="meal-header">
    ${random ? `<span class="random"> Random Recipe </span>` : ""}
        <img src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}" />
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h1>
        <button class="fav-btn"><i class="fas fa-heart"></i></button>
    </div>`;
  const btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealLS(mealData.idMeal);
      btn.classList.add("active");
    }
    fetchFavMeals();
  });
  meals.appendChild(meal);
}


function addMealLS(mealId) {
  const mealIds = getMealLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}


function removeMealLS(mealId) {
  const mealIds = getMealLS();

  localStorage.setItem(
    "mealIds",
    JSON.stringify(
      mealIds.filter((id) => {
        id !== mealId;
      })
    )
  );
}
function getMealLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}


async function fetchFavMeals() {
  //clean the container 
  favouriteContainer.innerHTML='';
  const mealIds = getMealLS();
  for (i = 0; i < mealIds.length; i++) {
    let mealId = mealIds[i];
    meal = await getMealById(mealId);
    //  meals.push(meal)
    addMealToFav(meal);
  }
}


function addMealToFav(mealData) {
  //clean the container
  const favMeal = document.createElement("li");

  favMeal.innerHTML = `  
  <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
  <span class="img-span">${mealData.strMeal}</span>
  <button class='clear'><i class="fas fa-window-close"></i></button>
  `;
  const btn =favMeal.querySelector('.clear');
  btn.addEventListener('click',()=>{
    removeMealLS(mealData.idMeal);
    fetchFavMeals();
  })
  favouriteContainer.appendChild(favMeal);
}


searchBtn.addEventListener('click',async ()=>{
  const search = searchTerm.value;

  // console.log( await getMealBySearch(search))


  const meals = await  getMealBySearch(search);
  meals.forEach((meal)=>{
    addMeal(meal)
  })
})
