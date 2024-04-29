let wrapperCards = document.querySelector(".cards");
let searchInput = document.querySelector(".search__input");
let API__URL = "https://66289a1f54afcabd073644cb.mockapi.io/shop";
let loading = document.querySelector(".loading");
let selectCategory = document.querySelector(".products__category");

async function fetchData(api, searchText = "", categoryText = "") {
  let data = await fetch(
    `${api}/products?name=${searchText}&category=${categoryText==="all"?fetchData(API__URL):categoryText}`,
    {
      method: "GET",
    }
  );
  data
    .json()
    .then((res) => mapCard(res))
    .catch((err) => console.log(err))
    .finally(() => {
      loading.style.display = "none";
    });
}

fetchData(API__URL);

async function getCategory(URL) {
  let data = await fetch(URL + "/products");
  let categories = [];
  data
    .json()
    .then((res) => {
      res.forEach((product) => {
        if (!categories.includes(product.category)) {
          categories.push(product.category);
        }
      });
      mapCategories(categories);
    })
    .catch((err) => console.log(err));
}

function mapCategories(categoryData) {
  let options = `<option value="all">All</option>`;
  categoryData.forEach(
    (category) =>
      (options += `<option value="${category}">${
        category.slice(0, 1).toUpperCase() + category.slice(1).toLowerCase()
      }</option>`)
  );
  selectCategory.innerHTML = options;
}

selectCategory.addEventListener("change", (e) => {
  let category = e.target.value;
  fetchData(API__URL, "", category);
});

getCategory(API__URL);

function mapCard(data) {
  let cards = "";
  data.forEach((product) => {
    cards += `
            <div class="card">
              <img class="img" src=${product.img} alt="">
              <div class="desc">
                <h2 class="card__name">${product.name}</h2>
                <p class="card__desc">${product.info}</p>
                <p>${product.size + " " + product.unit}</p>
              </div>
              <button data-id=${
                product.id
              } class="card__btn">See more details</button>
            </div>
        `;
  });
  wrapperCards.innerHTML = cards;
}

wrapperCards.addEventListener("click", (e) => {
  if (e.target.className === "card__btn") {
    let id = e.target.dataset.id;
    window.open(`/pages/card.html?id=${id}`, "_self");
  }
});

function createLoadingCard(count) {
  let loadCard = "";
  for (let i = 0; i < count; i++) {
    loadCard += `   
          <div class="loading__item">
          <div class="loading__img bg__animation"></div>
          <div class="loading__title bg__animation"></div>
          <div class="loading__title bg__animation"></div>
          <button class="loading__btn bg__animation"></button>
        </div>
            `;
    loading.innerHTML = loadCard;
  }
}

createLoadingCard(20);

searchInput.addEventListener("input", (e) => {
  let searchText = e.target.value;
  fetchData(API__URL, searchText);
});
