export default function beerDetailsPage(beer) {
  document.querySelector(".detail-content").style.display = "block";
  document.querySelector("#main-content").style.display = "none";
  const imgContainer = document.querySelector("#detail-img");
  imgContainer.innerHTML = "";
  const detailBody = document.querySelector("#detail-body");
  detailBody.innerHTML = "";
  const beerImg = document.createElement("img");
  beerImg.className = "detail-img";
  beerImg.src = beer.image_url;
  imgContainer.appendChild(beerImg);
  const card = document.createElement("div");
  card.className = "card";
  const cardHead = document.createElement("div");
  cardHead.className = "card-header";
  const cardTitle = document.createElement("h3");
  cardTitle.className = "card-title";
  cardTitle.innerText = beer.name;
  cardHead.appendChild(cardTitle);
  const cardSlogan = document.createElement("p");
  cardSlogan.className = "card-text";
  cardSlogan.innerText = beer.tagline;
  cardHead.appendChild(cardSlogan);
  card.appendChild(cardHead);
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  const cardDescription = document.createElement("p");
  cardDescription.className = "card-text";
  cardDescription.innerText = beer.description;
  cardBody.appendChild(cardDescription);
  const cardAbv = document.createElement("p");
  cardAbv.className = "card-text";
  cardAbv.innerText = `Alcohol: ${beer.abv}%`;
  cardBody.appendChild(cardAbv);
  const brewDate = document.createElement("p");
  brewDate.className = "card-text";
  brewDate.innerText = `Brewed: ${beer.first_brewed}`;
  cardBody.appendChild(brewDate);
  const cardBitterness = document.createElement("p");
  cardBitterness.className = "card-text";
  cardBitterness.innerText = `Bitterness: ${beer.ibu} IBU`;
  cardBody.appendChild(cardBitterness);
  card.appendChild(cardBody);
  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer";
  const foodPair = document.createElement("h4");
  foodPair.innerText = "Food pairing";
  cardFooter.appendChild(foodPair);
  for (let food of beer.food_pairing) {
    const newFood = document.createElement("p");
    newFood.innerText = `"${food}"`;
    cardFooter.appendChild(newFood);
  }
  card.appendChild(cardFooter);
  detailBody.appendChild(card);
}
