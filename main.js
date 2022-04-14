'use strict';
const APP_ID = '4c581ddc';
const APP_KEY = '2b9046cf40a6ddf4b346200f1c9f5cdd';
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const searchResultDiv = document.querySelector('.search-result');
const conatainer = document.querySelector('.container');
let searchValue = '';
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  searchValue = searchInput.value;
  getData(searchValue);
  searchInput.value = '';
});
const renderSpinner = function (parentElement) {
  const markup = document.createElement('img');
  markup.setAttribute('src', '././loading.png');
  markup.classList.add('spinner');
  parentElement.innerHTML = '';
  //parentElement.insertAdjacentElement('afterbegin', markup);
  parentElement.prepend(markup);
};

const getData = async function (searchString) {
  try {
    renderSpinner(searchResultDiv);
    const url = `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=40`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    if (data.hits.length < 1) {
      renderError();
    }
    totalResults(data.count);
    renderRecepies(data.hits);
  } catch (err) {
    console.error(err);
  }
};
const renderError = function () {
  const markupError = document.createElement('div');
  markupError.textContent = `We could not find that recipe. Please try another one!`;
  markupError.classList.add('error');
  searchResultDiv.innerHTML = '';
  searchResultDiv.insertAdjacentElement('beforebegin', markupError);
};
const totalResults = num => {
  let total = '';
  total = document.createElement('div');
  total.textContent = `Total results :${num}`;
  total.classList.add('total');
  searchResultDiv.insertAdjacentElement('beforebegin', total);
};
const renderRecepies = function (results) {
  let recepieCard = '';
  results.forEach(item => {
    recepieCard += `    <div class="item">
    <img src=${item.recipe.image} alt="food-photo" />
    <div class="flex-container">
      <h1 class="title">${item.recipe.label}</h1>
      <a href="${
        item.recipe.url
      }" target="_blank" class="view-btn">View Recipe</a>
    </div>
    <p class="item-data">HealthLabels: ${item.recipe.healthLabels.slice(
      0,
      8
    )}</p>

    <p class="item-data">Clories: ${Math.floor(item.recipe.calories)}</p>
    <h3 class="cuisine-type"> Cuisine Type:<span> ${
      item.recipe.cuisineType
    }</span></h3>
    <h3 class="meal-type" >Meal Type:<span> ${item.recipe.mealType}</span></h3>

  </div>`;
  });
  searchResultDiv.innerHTML = recepieCard;

  //renderBtn();
};
/* const renderBtn = () => {
  const button = document.createElement('button');
  button.innerHTML = ' Load more recipes...';
  button.classList.add('btn');
  conatainer.append(button);
  button.addEventListener('click', e => {
    let indexBtn = 20;
    getData(indexBtn);
    searchResultDiv.innerHTML = '';
  });
}; */
//pagination
/* const paginationEl = document.getElementById('pagination');
let current_page = 1;
 */
