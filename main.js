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
  getData(searchValue, 0);
  //searchInput.value = '';
});
const renderSpinner = function (parentElement) {
  const markup = document.createElement('img');
  markup.setAttribute('src', '././loading.png');
  markup.classList.add('spinner');
  parentElement.innerHTML = '';
  //parentElement.insertAdjacentElement('afterbegin', markup);
  parentElement.prepend(markup);
};
//geting data from api
const getData = async function (searchString, index = 0) {
  try {
    renderSpinner(searchResultDiv);
    const url = `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${index}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    if (data.hits.length < 1) {
      renderError();
    }
    totalResults(data.count);
    renderRecepies(data.hits);
    createPagination(data.count);
  } catch (err) {
    console.error(err);
  }
};
const renderError = function () {
  const markupError = document.querySelector('.error');
  markupError.textContent = `We could not find that recipe. Please try another one!`;
  searchResultDiv.innerHTML = '';
};

const totalResults = num => {
  const total = document.querySelector('.total');
  total.textContent = `Total results :${num}`;
};
//rendering data
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
};

//create pagination
const createPagination = data => {
  let pagesDiv = document.querySelector('.pagination');
  let allPages = Math.round(data / 10);
  let activePage = data.from / 10;
  pagesDiv.innerHTML = '';

  if (allPages > 10) allPages = 10;

  for (let page = 1; page <= allPages; page++) {
    if (page - 1 === activePage) {
      let active = document.createElement('button', page);
      active.classList.add('disabled');
      pagesDiv.append(active);
      continue;
    }
    const someButton = document.createElement('button', page);
    someButton.textContent = page;
    pagesDiv.append(someButton);
  }

  paginationOnClick();
};
const paginationOnClick = () => {
  const paginationBtns = document.querySelectorAll('.pagination button');

  paginationBtns.forEach(function (btn, i) {
    const index = i * 10;
    btn.addEventListener('click', () => {
      searchValue = searchInput.value;
      getData(searchValue, index);
      window.scrollTo({ left: 0, top: 500, behavior: 'smooth' });
    });
  });
};
