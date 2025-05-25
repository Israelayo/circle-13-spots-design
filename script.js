const savedCards = localStorage.getItem('card');
let cardsData = savedCards ? JSON.parse(savedCards) :
 [
  {
    className: "card__1",
    imageSrc: "assets/pexels-kassandre-pedro-8639743 1.png",
    alt: "pic__1",
    text: "Val Thorens",
    liked: false
  },
  {
    className: "card__2",
    imageSrc: "assets/pexels-kassandre-pedro-8639743 2.png",
    alt: "pic__2",
    text: "Restaurant terrace",
    liked: false
  },
  {
    className: "card__3",
    imageSrc: "assets/pexels-kassandre-pedro-8639743 3.png",
    alt: "pic__3",
    text: "An outdoor cafe",
    liked: false
  },
  {
    className: "card__4",
    imageSrc: "assets/pexels-kassandre-pedro-8639743 4.png",
    alt: "pic__4",
    text: "A very long bridge, over the forest...",
    liked: false
  },
  {
    className: "card__5",
    imageSrc: "assets/pexels-kassandre-pedro-8639743 5.png",
    alt: "pic__5",
    text: "Tunnel with morning light",
    liked: false
  },
  {
    className: "card__6",
    imageSrc: "assets/pexels-kassandre-pedro-8639743 6.png",
    alt: "pic__6",
    text: "Mountain house",
    liked: false
  },
 
];

const container = document.querySelector(".card-section");

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const closeBtn = document.querySelector(".close");

function enableModal() {
  const images = document.querySelectorAll(".card-section img");

  images.forEach((img, idx) => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = cardsData[idx].imageSrc;
      modalImg.alt = cardsData[idx].alt;
      modalCaption.textContent = cardsData[idx].text;
    });
  });

  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };
}
function renderCard () {
  container.innerHTML= ""
cardsData.forEach((card, index) => {
  const cardDiv = document.createElement("div");
  cardDiv.className = card.className;

  cardDiv.innerHTML = `
    <div>
      <img src="${card.imageSrc}" alt="${card.alt}" />
    </div>
    <div class="card_text">
      <p>${card.text}</p>
      <i class="${card.liked ? 'fa-solid' : 'fa-regular'} fa-heart" 
         style ="color: ${card.liked ? "red" : ""}"
         data-index="${index}"></i>
    </div>
  `;

  container.appendChild(cardDiv);
});

const heartIcon = document.querySelectorAll('.fa-heart');

heartIcon.forEach((icon) => {
    icon.addEventListener('click', () => {
        const index = icon.getAttribute("data-index");
        cardsData[index].liked = !cardsData[index].liked;

        localStorage.setItem('card', JSON.stringify(cardsData))
        
        renderCard();
    });
});
enableModal();
}
renderCard();
