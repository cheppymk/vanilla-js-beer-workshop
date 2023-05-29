import { BASE_URL } from "./constants.js";
import beerDetailsPage from "./detailsPageBuilder.js";
import createBeerCard from "./cardBuilder.js";

let currentBeerList = [];
let currentPage = 1;
let itemsPerPage = 20;
let searchQuery = "";

function renderBeers(beers) {
  document.querySelector(".next-page-item").classList.remove("disabled");
  document.querySelector("#main-content").style.display = "block";
  document.querySelector(".detail-content").style.display = "none";
  const container = document.querySelector(".item-container");
  container.innerHTML = "";
  beers.forEach((beer) => {
    container.appendChild(createBeerCard(beer));
  });
}

// MAIN PAGE LINKS
document
  .querySelector("#list-beers-link")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    searchQuery = "";
    document.querySelector(".hero-container").classList.add("hidden");
    const loading = document.querySelector(".main-loader");
    loading.classList.remove("hidden");
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      currentBeerList = data;
      renderBeers(data);
    } catch (err) {
      console.error(err);
    } finally {
      loading.classList.add("hidden");
    }
  });

// RANDOM BEERS
document
  .querySelector("#get-random-beer")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    searchQuery = "";
    document.querySelector(".hero-container").classList.add("hidden");
    const loading = document.querySelector(".loading-spinner");
    loading.classList.remove("hidden");
    try {
      const response = await fetch(`${BASE_URL}/random`);
      const data = await response.json();
      document.querySelector(".hero-container").classList.add("hidden");
      beerDetailsPage(data[0]);
    } catch (err) {
      console.error(err);
    } finally {
      loading.classList.add("hidden");
    }
  });

// HERO ACTION
document
  .querySelector("#hero-action-btn")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    document.querySelector(".hero-container").classList.add("hidden");
    const loading = document.querySelector(".main-loader");
    loading.classList.remove("hidden");
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      currentBeerList = data;
      renderBeers(data);
    } catch (err) {
      console.error(err);
    } finally {
      loading.classList.add("hidden");
    }
  });

// PAGE RESET
document.querySelector("#logo-brand").addEventListener("click", (e) => {
  e.preventDefault();
  location.reload();
});

// SEARCH HANDLER
document.querySelector("#search-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const loader = document.querySelector(".loading-spinner");
  loader.classList.remove("hidden");
  let keyword = document.querySelector("#search-input").value;
  keyword = keyword.replaceAll(" ", "_");
  searchQuery = keyword;
  try {
    const response = await fetch(
      `${BASE_URL}?beer_name=${keyword}&per_page=${itemsPerPage}`
    );
    const data = await response.json();
    if (!data.length) {
      loader.classList.add("hidden");
      let errAlert = document.querySelector(".search-error");
      errAlert.classList.remove("hidden");
      return;
    }
    document.querySelector(".hero-container").classList.add("hidden");
    currentBeerList = data;
    renderBeers(data);
    loader.classList.add("hidden");
    e.target.reset();
  } catch (err) {
    let errAlert = document.querySelector(".search-error");
    errAlert.classList.remove("hidden");
    console.error(err);
  }
});

document.querySelector("#no-beer-err").addEventListener("click", () => {
  let errAlert = document.querySelector(".search-error");
  errAlert.classList.add("hidden");
});

// --- ITEMS PER PAGE ---
const allPerPages = document.querySelectorAll(".beers-per-page");
for (let beersPerPage of allPerPages) {
  beersPerPage.addEventListener("click", async (e) => {
    e.preventDefault();
    itemsPerPage = Number(e.target.dataset.value);
    try {
      let fetchUrl = searchQuery
        ? `${BASE_URL}?beer_name=${searchQuery}&per_page=${itemsPerPage}`
        : `${BASE_URL}?per_page=${itemsPerPage}`;
      const response = await fetch(fetchUrl);
      currentBeerList = await response.json();
      renderBeers(currentBeerList);
    } catch (err) {
      console.error(err);
    }
  });
}

// --- SORTING ---
document.querySelector("#sort-by-name-asc").addEventListener("click", (e) => {
  e.preventDefault();
  currentBeerList = currentBeerList.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  renderBeers(currentBeerList);
});

document.querySelector("#sort-by-name-des").addEventListener("click", (e) => {
  e.preventDefault();
  currentBeerList = currentBeerList.sort((a, b) => {
    if (a.name < b.name) return 1;
    if (a.name > b.name) return -1;
    return 0;
  });
  renderBeers(currentBeerList);
});

document.querySelector("#sort-by-abv-asc").addEventListener("click", (e) => {
  e.preventDefault();
  currentBeerList = currentBeerList.sort((a, b) => a.abv - b.abv);
  renderBeers(currentBeerList);
});

document.querySelector("#sort-by-abv-des").addEventListener("click", (e) => {
  e.preventDefault();
  currentBeerList = currentBeerList.sort((a, b) => b.abv - a.abv);
  renderBeers(currentBeerList);
});

document.querySelector("#sort-by-ibu-asc").addEventListener("click", (e) => {
  e.preventDefault();
  currentBeerList = currentBeerList.sort((a, b) => a.ibu - b.ibu);
  renderBeers(currentBeerList);
});

document.querySelector("#sort-by-ibu-des").addEventListener("click", (e) => {
  e.preventDefault();
  currentBeerList = currentBeerList.sort((a, b) => b.ibu - a.ibu);
  renderBeers(currentBeerList);
});

document.querySelector("#sort-by-date-asc").addEventListener("click", (e) => {
  e.preventDefault();
  currentBeerList = currentBeerList.sort((a, b) => {
    let aDate = a.first_brewed.split("/");
    let bDate = b.first_brewed.split("/");
    return (
      new Date(`${aDate[1]}-${aDate[0]}-01`) -
      new Date(`${bDate[1]}-${bDate[0]}-01`)
    );
  });
  renderBeers(currentBeerList);
});

document.querySelector("#sort-by-date-des").addEventListener("click", (e) => {
  e.preventDefault();
  currentBeerList = currentBeerList.sort((a, b) => {
    let aDate = a.first_brewed.split("/");
    let bDate = b.first_brewed.split("/");
    return (
      new Date(`${bDate[1]}-${bDate[0]}-01`) -
      new Date(`${aDate[1]}-${aDate[0]}-01`)
    );
  });
  renderBeers(currentBeerList);
});
// --- END OF SORTING ---

// PAGINATION
document.querySelector("#prev-page").addEventListener("click", async (e) => {
  // e.preventDefault();
  if (currentPage === 1) {
    console.log("On the first page");
    return;
  }
  currentPage--;
  if (currentPage === 1) {
    document.querySelector(".prev-page-item").classList.add("disabled");
  }
  try {
    let fetchUrl = searchQuery
      ? `${BASE_URL}?beer_name=${searchQuery}&page=${currentPage}&per_page=${itemsPerPage}`
      : `${BASE_URL}?page=${currentPage}&per_page=${itemsPerPage}`;
    const response = await fetch(fetchUrl);
    currentBeerList = await response.json();
    renderBeers(currentBeerList);
  } catch (err) {
    console.error(err);
  }
});

document.querySelector("#next-page").addEventListener("click", async (e) => {
  // e.preventDefault();
  if (currentPage === 1) {
    document.querySelector(".prev-page-item").classList.remove("disabled");
  }
  currentPage++;
  try {
    let fetchUrl = searchQuery
      ? `${BASE_URL}?beer_name=${searchQuery}&page=${currentPage}&per_page=${itemsPerPage}`
      : `${BASE_URL}?page=${currentPage}&per_page=${itemsPerPage}`;
    const response = await fetch(fetchUrl);
    let data = await response.json();
    if (!data.length) {
      document.querySelector(".next-page-item").classList.add("disabled");
      return;
    }
    currentBeerList = data;
    renderBeers(currentBeerList);
  } catch (err) {
    console.error(err);
  }
});

// BACK BUTTON
document.querySelector("#back-btn").addEventListener("click", () => {
  if (!currentBeerList.length) {
    document.querySelector(".detail-content").style.display = "none";
    document.querySelector(".hero-container").classList.remove("hidden");
    return;
  }
  document.querySelector("#main-content").style.display = "block";
  document.querySelector(".detail-content").style.display = "none";
});
