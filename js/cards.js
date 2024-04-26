let wrapperCards = document.querySelector(".cards")
let API__URL = "https://66289a1f54afcabd073644cb.mockapi.io/shop";
let loading = document.querySelector(".loading")

async function fetchData(api) {
    let data = await fetch(`${api}/products`);
    data
      .json()
      .then((res) => mapCard(res))
      .catch((err) => console.log(err))
      .finally(()=>{
        loading.style.display = "none"
      })
}

fetchData(API__URL)


function mapCard(data) {
  let cards = "";
  data.forEach((product) => {
    cards += `
            <div class="card">
              <img class="img" src=${product.img} alt="">
              <div class="desc">
                <h2 class="card__name">${product.name}</h2>
                <p class="card__desc">${product.info}</p>
                <p>${product.size + " "+ product.unit}</p>
              </div>
              <button data-id=${product.id} class="card__btn">See more details</button>
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
