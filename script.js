const cardsData = [
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

// Render cards
function renderCards() {
  container.innerHTML = "";
  cardsData.forEach((card, idx) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = card.className + " card";
    cardDiv.innerHTML = `
      <div class="card-img-container" style="cursor:pointer">
        <img src="${card.imageSrc}" alt="${card.alt}" data-idx="${idx}" />
      </div>
      <div class="card_text">
        <p>
        ${card.text}
        </p>
        <i class="fa-regular fa-heart" tabindex="0" aria-label="Like"></i>
      </div>
    `;
    container.appendChild(cardDiv);

    // Heart icon toggle
    const heartIcon = cardDiv.querySelector(".fa-heart");
    heartIcon.addEventListener("click", function () {
      this.classList.toggle("fa-regular");
      this.classList.toggle("fa-solid");
      this.style.color = this.classList.contains("fa-solid") ? "red" : "";
    });

    // Preview modal on image click
    cardDiv.querySelector("img").addEventListener("click", function () {
      openPreviewModal(card.imageSrc, card.text);
    });
  });
}
renderCards();

// Modal helpers
function openModal(id) {
  const modal = document.getElementById(id);
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  setTimeout(() => {
    const firstInput = modal.querySelector("input,button,textarea,select");
    if (firstInput) firstInput.focus();
  }, 100);
  // Esc key closes modal
  function escHandler(e) {
    if (e.key === "Escape") closeModal(id);
  }
  modal._escHandler = escHandler;
  window.addEventListener("keydown", escHandler);
  // Click outside closes modal
  modal.addEventListener("mousedown", function outsideClick(e) {
    if (e.target === modal) closeModal(id);
  });
}
function closeModal(id) {
  const modal = document.getElementById(id);
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  window.removeEventListener("keydown", modal._escHandler);
}

// Close modal on X click
document.querySelectorAll(".modal .close").forEach(btn => {
  btn.addEventListener("click", function () {
    closeModal(this.dataset.close);
  });
});

// 1. Edit Profile Modal
document.querySelector('.edit-profile .edit').addEventListener('click', function (e) {
  e.preventDefault();
  // Prefill modal
  const heroSection = document.querySelector('.hero-section');
  const nameEl = heroSection.querySelector('.hero-text h1');
  const professionEl = heroSection.querySelector('.hero-text p');
  const imgEl = heroSection.querySelector('.hero-img img');
  document.getElementById("profileName").value = nameEl.textContent;
  document.getElementById("profileProfession").value = professionEl.textContent;
  document.getElementById("profileAvatar").value = "";
  openModal("editProfileModal");
  // Save handler
  const form = document.getElementById("editProfileForm");
  form.onsubmit = function (ev) {
    ev.preventDefault();
    // Validation
    const name = form.profileName.value.trim();
    const profession = form.profileProfession.value.trim();
    if (name.length < 2 || profession.length < 2) {
      alert("Minimum 5 characters required.");
      return;
    }
    nameEl.textContent = name;
    professionEl.textContent = profession;
    const file = form.profileAvatar.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imgEl.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    closeModal("editProfileModal");
  };
});

// 2. Image Preview Modal
function openPreviewModal(src, title) {
  document.getElementById("previewImg").src = src;
  document.getElementById("previewTitle").textContent = title;
  openModal("previewModal");
}

// 3. New Post Modal
document.querySelector(".new-post-btn").addEventListener("click", function () {
  document.getElementById("newPostForm").reset();
  document.getElementById("createPostBtn").disabled = true;
  openModal("newPostModal");
});

// Validate new post form
const newPostForm = document.getElementById("newPostForm");
const newPostTitle = document.getElementById("newPostTitle");
const newPostImage = document.getElementById("newPostImage");
const createPostBtn = document.getElementById("createPostBtn");

function validateNewPost() {
  const titleValid = newPostTitle.value.trim().length >= 2 && newPostTitle.value.trim().length <= 30;
  const imgValid = newPostImage.files.length > 0;
  createPostBtn.disabled = !(titleValid && imgValid);
}
newPostTitle.addEventListener("input", validateNewPost);
newPostImage.addEventListener("change", validateNewPost);

// Handle new post submit
newPostForm.onsubmit = function (e) {
  e.preventDefault();
  const title = newPostTitle.value.trim();
  const file = newPostImage.files[0];
  if (title.length < 2 || !file) return;
  const reader = new FileReader();
  reader.onload = function (ev) {
    cardsData.unshift({
      className: "card__" + (cardsData.length + 1),
      imageSrc: ev.target.result,
      alt: "user_post",
      text: title,
    });
    renderCards();
    closeModal("newPostModal");
  };
  reader.readAsDataURL(file);
}; 
