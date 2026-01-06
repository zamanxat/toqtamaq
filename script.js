/* =========================
   PAGE NAVIGATION
========================= */

const homePage = document.querySelector(".home-page");
const catalogPage = document.querySelector(".catalog-page");
const cartPage = document.querySelector(".cart-page");
const ordersPage = document.querySelector(".orders-page");
const closeOnlyBtn = document.querySelector(".close-only");

const homeBtns = document.querySelectorAll(".home-icon");
const catalogBtns = document.querySelectorAll(".catalog-icon");
const cartBtns = document.querySelectorAll(".cart-icon");
const ordersBtns = document.querySelectorAll(".orders-icon");

function hideAllPages() {
  homePage.style.display = "none";
  catalogPage.style.display = "none";
  cartPage.style.display = "none";
  ordersPage.style.display = "none";
}
closeOnlyBtn.addEventListener("click", () => {
  hideAllPages();
  homePage.style.display = "block";
});

homeBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    hideAllPages();
    homePage.style.display = "block";
  })
);

catalogBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    hideAllPages();
    catalogPage.style.display = "block";
  })
);

cartBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    hideAllPages();
    cartPage.style.display = "block";
  })
);

ordersBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    hideAllPages();
    ordersPage.style.display = "block";
  })
);

/* =========================
   CART DATA
========================= */

let cartItems = [];

function findCartItem(name) {
  return cartItems.find((item) => item.name === name);
}

/* =========================
   PRODUCT DETAILS
========================= */

const productDetails = {
  "KALE Caesar": { description: "Fresh kale, caesar sauce, parmesan" },
  "Strawberry Smoothie": { description: "Fresh strawberry, milk, honey" },
  "Toffee Crunch": { description: "Sweet toffee, crunchy texture" },
  "Apple Pie": { description: "Classic apple pie with cinnamon" },
  "Colourful Salad": { description: "Fresh vegetables, colorful presentation" },
  "Carbs Salad": { description: "Carbs salad with vegetables" },
  "Craft latte": { description: " " },
  "Veggie Salad": { description: " " },
};

/* =========================
   POPUP ELEMENTS
========================= */

const popup = document.querySelector(".product-popup");
const popupImage = document.querySelector(".popup-image");
const popupName = document.querySelector(".popup-name");
const popupPrice = document.querySelector(".popup-price");
const popupDesc = document.querySelector(".popup-desc");

const popupAddBtn = document.querySelector(".popup-add-cart");
const popupCounter = document.querySelector(".popup-counter");
const countSpan = document.querySelector(".count");

const popupTotal = document.querySelector(".popup-total");
const popupTotalBlack = document.querySelector(".popup-total-black");
const birdiv2 = document.querySelector(".birdiv2");

const plusBtn = document.querySelector(".plus-btn");
const minusBtn = document.querySelector(".minus-btn");
const closeBtn = document.querySelector(".close-popup");

let currentProduct = null;
let quantity = 0;

/* =========================
   RESET POPUP UI  ⭐⭐⭐
========================= */

function resetPopupUI() {
  quantity = 0;
  countSpan.textContent = "1pcs";

  popupAddBtn.style.display = "block";
  popupCounter.style.display = "none";

  popupTotal.style.display = "none";
  popupTotalBlack.style.display = "none";
  birdiv2.style.display = "none";

  popupTotal.textContent = "000 KZT";
}

/* =========================
   OPEN POPUP
========================= */

function openPopup(product) {
  currentProduct = product;

  resetPopupUI(); // ⭐ ең маңыздысы

  popupImage.src = product.image;
  popupName.textContent = product.name;
  popupPrice.textContent = product.price + " KZT";
  popupDesc.innerHTML = `<p>Categories:</p> ${
    productDetails[product.name]?.description || ""
  }`;

  const cartItem = findCartItem(product.name);

  if (cartItem) {
    quantity = cartItem.quantity;

    countSpan.textContent = quantity + "pcs";
    popupTotal.textContent = quantity * product.price + " KZT";

    popupAddBtn.style.display = "none";
    popupCounter.style.display = "flex";

    popupTotal.style.display = "block";
    popupTotalBlack.style.display = "block";
    birdiv2.style.display = "flex";
  }

  popup.style.display = "block";
}

/* =========================
   PRODUCT CLICK
========================= */

document.querySelectorAll(".product-box").forEach((box) => {
  box.addEventListener("click", (e) => {
    if (e.target.closest(".add-btn")) return;

    openPopup({
      name: box.dataset.name,
      price: +box.dataset.price,
      image: box.dataset.image,
    });
  });
});

/* =========================
   ADD TO CART
========================= */

popupAddBtn.addEventListener("click", () => {
  quantity = 1;

  cartItems.push({
    name: currentProduct.name,
    price: currentProduct.price,
    image: currentProduct.image,
    quantity: quantity,
  });

  saveCart();
  renderCart(); // ✅ қосу керек

  function openPopupFromCart(productName) {
  const item = findCartItem(productName);
  if (!item) return;

  openPopup({
    name: item.name,
    price: item.price,
    image: item.image,
  });
}


  saveCart();
  // ✅ Егер Cart беті ашық болса, автоматты түрде жаңарту
    if (cartPage.style.display === "block") {
      renderCart();
    }

  countSpan.textContent = "1pcs";
  popupTotal.textContent = currentProduct.price + " KZT";

  popupAddBtn.style.display = "none";
  popupCounter.style.display = "flex";

  popupTotal.style.display = "block";
  popupTotalBlack.style.display = "block";
  birdiv2.style.display = "flex";
});

/* =========================
   PLUS / MINUS
========================= */

plusBtn.addEventListener("click", () => {
  quantity++;

  const item = findCartItem(currentProduct.name);
  item.quantity = quantity;

  countSpan.textContent = quantity + "pcs";
  popupTotal.textContent = quantity * currentProduct.price + " KZT";saveCart();
  
  saveCart();
  renderCart(); // ✅ осында қосу керек
});




minusBtn.addEventListener("click", () => {
  quantity--;

  if (quantity === 0) {
    cartItems = cartItems.filter((item) => item.name !== currentProduct.name);
    resetPopupUI();
  } else {
    const item = findCartItem(currentProduct.name);
    item.quantity = quantity;

    countSpan.textContent = quantity + "pcs";
    popupTotal.textContent = quantity * currentProduct.price + " KZT";
  }
  
});

/* =========================
   CLOSE POPUP
========================= */

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
  resetPopupUI();
});

const buttons = document.querySelectorAll(".add-btn");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();

    const box = button.closest(".product-box");
    const productName = box.dataset.name;
    const productPrice = +box.dataset.price;
    const productImage = box.dataset.image;

    let cartItem = findCartItem(productName);

    if (cartItem) {
      cartItem.quantity++;
    } else {
      cartItems.push({
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1,
      });
    }
  });
});

/* =========================
   LOCAL STORAGE
========================= */

function saveCart() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function loadCart() {
  const data = localStorage.getItem("cartItems");
  if (data) {
    cartItems = JSON.parse(data);
  }
}

loadCart();

/* =========================
   CART RENDER
========================= */

const cartContainer = document.querySelector(".cart-items-container");
const cartEmptyText = document.querySelector(".cart-empty-text");
const cartTotalPrice = document.querySelector(".cart-total-price");

function renderCart() {
  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartEmptyText.style.display = "block";
    cartTotalPrice.textContent = "0 KZT";
    return;
  }

  cartEmptyText.style.display = "none";

  let total = 0;

  cartItems.forEach((item) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <div class="flex-for" style="display:flex;align-items:center;justify-content:space-between;width:100%;">
          <div class="flex-for-2" style="display:flex;align-items:center;gap:20px;">
              <div class="fon" style="width:90px;height:70px;overflow:hidden;border-radius:17px; background-color:#ffffff;display:flex;align-items:center;justify-content:center; border:1px solid #DEDEDE; box-sizing:border-box;position:relative;">
             
                  <div style="position: absolute; z-index: 1000; display: flex; background-color:#D2E867; width: 30px; height: 30px; text-decoration: none; text-align: center; align-items: center; justify-content: center; left:0.1px; top:0.1px">✔️</div>
                  <img src="${
                    item.image
                  }" class="cart-img" style="width:50px;height:50px;object-fit:cover;">
              </div>
              
              <div class="cart-info">
                <p class="cart-price">${item.price * item.quantity} KZT</p>
                <p class="cart-name">${item.name}</p>
              </div>
          </div>
          <div class="cart-counter" style="display:flex;align-items:center;gap:10px; background-color:#AAC32E; padding:15px 10px; border-radius:40px; color:white; font-weight:700; justify-content:space-between;">
            <button class="cart-minus" style="background-color:#AAC32E; border:none; font-size:18px; cursor:pointer; color:white; font-size:28px; border-radius:50%; padding-left:10px; padding-right:10px;">−</button>
            <span>${item.quantity} pcs</span>
            <button class="cart-plus" style="background-color:#AAC32E; border:none; font-size:18px; cursor:pointer; color:white; font-size:28px; border-radius:50%; padding-left:10px; padding-right:10px;">+</button>
          </div>
      </div>
      
      <hr style="border: 0.5px solid #DEDEDE; margin: 10px 0; opacity: 0.5;">
      <br/>
    `;

    // ➖
    cartItem.querySelector(".cart-minus").addEventListener("click", () => {
      item.quantity--;

      if (item.quantity === 0) {
        cartItems = cartItems.filter((i) => i.name !== item.name);
      }

      saveCart();
      renderCart();
    });

    // ➕
    cartItem.querySelector(".cart-plus").addEventListener("click", () => {
      item.quantity++;
      saveCart();
      renderCart();
    });


    cartItem.addEventListener("click", (e) => {
  if (
    e.target.closest(".cart-plus") ||
    e.target.closest(".cart-minus")
  ) return;

  openPopupFromCart(item.name);
});


    cartContainer.appendChild(cartItem);
  });

  cartTotalPrice.textContent = `${total} KZT`;
}

cartBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    hideAllPages();
    cartPage.style.display = "block";
    renderCart();
  })
);