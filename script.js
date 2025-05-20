const cardsData = [
  {
    className: "card__1",
    imageSrc: "assets/pexels-kassandre-pedro-8639743 1.png",
    alt: "pic__1",
    text: "Val Thorens",
  },
  {
    className: "card__2",
    imageSrc: "assets/pexels-kassandre-pedro-8639743 2.png",
    alt: "pic__2",
    text: "Restaurant terrace",
  },
  {
    className: "card__3",
    imageSrc: "assets/pexels-kassandre-pedro-8639743 3.png",
    alt: "pic__3",
    text: "An outdoor cafe",
  },
  {
    className: "card__4",
    imageSrc: "assets/pexels-kassandre-pedro-8639743 4.png",
    alt: "pic__4",
    text: "A very long bridge, over the forest...",
  },
  {
    className: "card__5",
    imageSrc: "assets/pexels-kassandre-pedro-8639743 5.png",
    alt: "pic__5",
    text: "Tunnel with morning light",
  },
  {
    className: "card__6",
    imageSrc: "assets/pexels-kassandre-pedro-8639743 6.png",
    alt: "pic__6",
    text: "Mountain house",
  },
];

const container = document.getElementById("cardsContainer");

cardsData.forEach((card) => {
  const cardDiv = document.createElement("div");
  cardDiv.className = card.className;

  cardDiv.innerHTML = `
    <div>
      <img src="${card.imageSrc}" alt="${card.alt}" />
    </div>
    <div class="card_text">
      <p>${card.text}</p>
      <i class="fa-regular fa-heart"></i>
    </div>
  `;

  container.appendChild(cardDiv);
});
