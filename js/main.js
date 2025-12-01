const products = [
  {
    id: 1,
    name: "Blazer de Linho Italiano",
    price: 590.0,
    category: "Alfaiataria",
    image: "public/linen-blazer-clothing.jpg",
    description: "Elegância natural para os dias de verão. Corte preciso e tecido respirável.",
  },
  {
    id: 2,
    name: "Vestido Midi Seda",
    price: 890.0,
    category: "Vestidos",
    image: "public/silk-dress-fashion.jpg",
    description: "Fluidez e sofisticação em uma peça única. Acabamento premium.",
  },
  {
    id: 3,
    name: "Calça Pantalona Crepe",
    price: 420.0,
    category: "Calças",
    image: "public/wide-leg-trousers.jpg",
    description: "Movimento e conforto com toque de formalidade moderna.",
  },
  {
    id: 4,
    name: "Camisa Algodão Egípcio",
    price: 350.0,
    category: "Camisas",
    image: "public/white-shirt-fashion.jpg",
    description: "O básico essencial elevado à perfeição. Toque macio e durabilidade.",
  },
  {
    id: 5,
    name: "Sobretudo Lã Fria",
    price: 1200.0,
    category: "Casacos",
    image: "public/wool-coat-fashion.jpg",
    description: "Proteção térmica com silhueta alongada e elegante.",
  },
  {
    id: 6,
    name: "Saia Plissada Metalizada",
    price: 380.0,
    category: "Saias",
    image: "public/pleated-skirt-fashion.jpg",
    description: "Um toque de brilho sutil para composições noturnas ou diurnas.",
  },
  {
    id: 7,
    name: "Calça de Alfaiataria em Lã Fria",
    price: 400.0,
    category: "Calças",
    image: "public/calca-creme.png",
    description: "Calça creme contendo conforto e elegância.",
  },
  {
    id: 8,
    name: "Sobretudo Trench Clássico",
    price: 1300.0,
    category: "Casacos",
    image: "public/sobretudo.png",
    description: "Sobretudo trench na cor cinza é um ícone de estilo atemporal.",
  },
  {
    id: 9,
    name: "A Saia Lápis Clássica",
    price: 480.0,
    category: "Saias",
    image: "public/saia.png",
    description: "Saia lápis em lã cinza carvão esculpe a silhueta com sofisticação.",
  },
  {
    id: 10,
    name: "Vestido Longo Drapeado em Verde Esmeralda",
    price: 1500.0,
    category: "Vestidos",
    image: "public/vestidoverde.png",
    description: "Vestido longo em verde esmeralda é uma celebração da cor e da fluidez.",
  },
  {
    id: 11,
    name: "Blazer de Lã Texturizada",
    price: 600.0,
    category: "Alfaiataria",
    image: "public/blazer.png",
    description:
      "Blazer clássico, agora em um sofisticado tom de azul profundo, é a personificação da elegância versátil.",
  },
  {
    id: 12,
    name: "Camisa Social",
    price: 450.0,
    category: "Camisas",
    image: "public/camisa.png",
    description:
      "Camisa social em um tom de azul sereno, exibindo a fluidez e o caimento impecável.",
  },
];

const cart = JSON.parse(localStorage.getItem("cart")) || [];
let itemToDeleteId = null;

const productsGrid = document.getElementById("featured-products-grid");
const productsListContainer = document.getElementById("products-list-container");
const productsPageTitle = document.querySelector(".section-title");

function isPagesFolder() {
  return window.location.pathname.includes("/pages/");
}

function resolveImagePath(imagePath) {
  return isPagesFolder() ? `../${imagePath}` : imagePath;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function updateCartCount() {
  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) {
    cartCountEl.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  }
}

function showToast(message) {
  let toast = document.getElementById("app-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.className = "toast-notification";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function createModal() {
  if (document.getElementById("remove-modal")) return;

  const modalHTML = `
    <div id="remove-modal" class="modal-overlay">
      <div class="modal-box">
        <h3 style="margin-bottom: 1rem;">Remover item?</h3>
        <p style="color: var(--color-text-light);">Tem certeza que deseja remover este produto da sua sacola?</p>
        <div class="modal-actions">
          <button onclick="closeModal()" class="btn btn-outline">Cancelar</button>
          <button onclick="confirmRemove()" class="btn btn-primary" style="background-color: #de3838; border-color: #de3838; color: white;">Sim, remover</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

function askToRemove(id) {
  createModal();
  itemToDeleteId = id;
  setTimeout(() => {
    document.getElementById("remove-modal").classList.add("open");
  }, 10);
}

function closeModal() {
  const modal = document.getElementById("remove-modal");
  if (modal) modal.classList.remove("open");
  itemToDeleteId = null;
}

function confirmRemove() {
  if (itemToDeleteId !== null) {
    const itemIndex = cart.findIndex((item) => item.id === itemToDeleteId);
    if (itemIndex > -1) {
      cart.splice(itemIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      renderCart();
      showToast("Item removido da sacola.");
    }
  }
  closeModal();
}

function initCarousel() {
  const carouselContainer = document.getElementById("hero-carousel");
  if (!carouselContainer) return;

  const images = carouselContainer.querySelectorAll(".hero-img");
  if (images.length < 2) return;

  let currentIndex = 0;

  setInterval(() => {
    images[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add("active");
  }, 5000);
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showToast("Produto adicionado no carrinho com sucesso!");
}

function updateQuantity(id, change) {
  const itemIndex = cart.findIndex((item) => item.id === id);
  if (itemIndex > -1) {
    const newQuantity = cart[itemIndex].quantity + change;

    if (newQuantity <= 0) {
      askToRemove(id);
    } else {
      cart[itemIndex].quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      renderCart();
    }
  }
}

function renderProductCard(product) {
  const imageSrc = resolveImagePath(product.image);
  const linkPath = isPagesFolder()
    ? `product-detail.html?id=${product.id}`
    : `pages/product-detail.html?id=${product.id}`;

  return `
        <article class="product-card">
            <a href="${linkPath}">
                <img src="${imageSrc}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <p class="product-category">${product.category}</p>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">${formatCurrency(product.price)}</p>
                </div>
            </a>
            <div style="padding: 1.5rem 0.5rem; display: flex; justify-content: center;">
                <button onclick="addToCart(${
                  product.id
                })" class="btn btn-outline btn-full">Adicionar</button>
            </div>
        </article>
    `;
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const subtotalEl = document.getElementById("cart-subtotal");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "<p>Seu carrinho está vazio.</p>";
    if (totalEl) totalEl.textContent = formatCurrency(0);
    if (subtotalEl) subtotalEl.textContent = formatCurrency(0);
    return;
  }

  container.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <img src="${resolveImagePath(item.image)}" alt="${item.name}" class="cart-item-image">
            <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <h3>${item.name}</h3>
                    <button onclick="askToRemove(${
                      item.id
                    })" class="remove-btn" aria-label="Remover item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
                
                <p style="margin-top: 0.5rem; font-weight: 600;">${formatCurrency(item.price)}</p>
                
                <div class="cart-controls">
                    <div class="quantity-group">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <p style="font-size: 0.9rem; color: var(--color-text-light);">Total: ${formatCurrency(
                      item.price * item.quantity
                    )}</p>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  if (totalEl) totalEl.textContent = formatCurrency(total);
  if (subtotalEl) subtotalEl.textContent = formatCurrency(total);
}

function injectBackButton() {
  const isHome =
    window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/");
  if (isHome) return;

  const main = document.querySelector("main");
  if (!main) return;

  const backBtn = document.createElement("button");
  backBtn.className = "back-btn-page";
  backBtn.ariaLabel = "Voltar";
  backBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Voltar</span>
    `;

  backBtn.onclick = () => window.history.back();
  main.insertBefore(backBtn, main.firstChild);
}

function filterProductsByQuery(query) {
  if (!query) return products;

  const normalizedQuery = query.toLowerCase().trim();

  return products.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(normalizedQuery);
    const matchesCategory = product.category.toLowerCase().includes(normalizedQuery);
    const matchesDescription = product.description.toLowerCase().includes(normalizedQuery);

    return matchesName || matchesCategory || matchesDescription;
  });
}

function renderProductsList(productsToRender) {
  if (productsListContainer) {
    if (productsToRender.length > 0) {
      productsListContainer.innerHTML = productsToRender.map(renderProductCard).join("");
    } else {
      productsListContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 0;">
                    <p style="color: var(--color-text-light); font-size: 1.1rem;">
                        Não encontramos produtos para sua busca. Tente um termo diferente.
                    </p>
                </div>
            `;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  injectBackButton();

  initCarousel();

  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("q");

  if (productsGrid) {
    productsGrid.innerHTML = products.slice(0, 4).map(renderProductCard).join("");
  }

  if (productsListContainer) {
    let productsToDisplay = [...products];

    if (searchQuery) {
      const decodedQuery = decodeURIComponent(searchQuery);
      productsToDisplay = filterProductsByQuery(decodedQuery);

      if (productsPageTitle) {
        productsPageTitle.innerHTML = `Resultados para: "<strong>${decodedQuery}</strong>"`;
      }

      const pageDescription = document.querySelector(".container.section > p");
      if (pageDescription) {
        pageDescription.style.display = "none";
      }
    }

    const sortSelect = document.getElementById("sort-by");

    function applySort(criteria) {
      switch (criteria) {
        case "low-price":
          productsToDisplay.sort((a, b) => a.price - b.price);
          break;
        case "high-price":
          productsToDisplay.sort((a, b) => b.price - a.price);
          break;
        case "newest":
          productsToDisplay.sort((a, b) => b.id - a.id);
          break;
        case "relevance":
        default:
          productsToDisplay.sort((a, b) => a.id - b.id);
          break;
      }
      renderProductsList(productsToDisplay);
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        applySort(e.target.value);
      });
    }

    renderProductsList(productsToDisplay);
  }

  const detailId = urlParams.get("id");

  if (detailId && document.getElementById("pd-container")) {
    const product = products.find((p) => p.id === Number.parseInt(detailId));
    if (product) {
      document.getElementById("pd-image").src = resolveImagePath(product.image);
      document.getElementById("pd-title").textContent = product.name;
      document.getElementById("pd-price").textContent = formatCurrency(product.price);
      document.getElementById("pd-desc").textContent = product.description;
      document.getElementById("add-to-cart-btn").onclick = () => addToCart(product.id);
    }
  }

  if (document.getElementById("cart-items")) {
    renderCart();
  }
});
