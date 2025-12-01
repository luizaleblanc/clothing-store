class AppHeader extends HTMLElement {
  connectedCallback() {
    const isPageFolder = window.location.pathname.includes("/pages/");
    this.basePath = isPageFolder ? ".." : ".";

    const logoSrc = `${this.basePath}/public/images/caputeeno-logo.png`;

    this.innerHTML = `
      <header class="header">
        <div class="container header-container">
          <a href="${this.basePath}/index.html" class="logo-link" aria-label="Home">
            <img src="${logoSrc}" alt="Caputeeno" class="logo-img">
          </a>
          
          <div class="header-actions">
            <button class="icon-btn" id="search-toggle" aria-label="Buscar">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <a href="${this.basePath}/pages/cart.html" class="icon-btn" aria-label="Carrinho">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span class="cart-count" id="cart-count">0</span>
            </a>

            <a href="${this.basePath}/pages/login.html" class="icon-btn" aria-label="Login">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </a>

            <button class="icon-btn" id="theme-toggle" aria-label="Alternar Tema">
                <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="display: none;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            </button>

            <button class="icon-btn" id="menu-toggle" aria-label="Menu">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
               </svg>
            </button>
          </div>

          <div class="search-form-container" id="search-overlay">
            <form id="desktopSearchForm">
                <input type="search" name="q" placeholder="Digite sua busca e pressione Enter..." required autofocus>
                <button type="button" class="icon-btn close-search-btn" id="close-search" aria-label="Fechar busca">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </form>
          </div>

          <div class="mobile-menu" id="mobile-menu">
            <nav>
                <ul>
                    <li><a href="${this.basePath}/index.html" class="menu-link">Início</a></li>
                    <li><a href="${this.basePath}/pages/products.html" class="menu-link">Roupas</a></li>
                    <li><a href="${this.basePath}/pages/about.html" class="menu-link">Nossa História</a></li>
                </ul>
            </nav>
          </div>
        </div>
      </header>
    `;

    this.initTheme();
    this.initMenu();
    this.initSearch();
    this.updateCartCount();
  }

  initTheme() {
    const toggleBtn = this.querySelector("#theme-toggle");
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemDark ? "dark" : "light");

    document.documentElement.setAttribute("data-theme", initialTheme);
    this.updateUI(initialTheme);

    toggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      this.updateUI(newTheme);
    });
  }

  updateUI(theme) {
    const sunIcon = this.querySelector(".sun-icon");
    const moonIcon = this.querySelector(".moon-icon");

    if (theme === "dark") {
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    } else {
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    }
  }

  initMenu() {
    const menuBtn = this.querySelector("#menu-toggle");
    const menuContent = this.querySelector("#mobile-menu");

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      menuContent.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!this.contains(e.target)) {
        menuContent.classList.remove("open");
      }
    });
  }

  updateCartCount() {
    const cartCountEl = this.querySelector("#cart-count");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartCountEl) {
      cartCountEl.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    }
  }

  initSearch() {
    const searchToggle = this.querySelector("#search-toggle");
    const searchOverlay = this.querySelector("#search-overlay");
    const closeSearch = this.querySelector("#close-search");
    const desktopSearchForm = this.querySelector("#desktopSearchForm");

    const handleSearch = (event, form) => {
      event.preventDefault();
      const query = form.querySelector('input[name="q"]').value.trim();
      if (query) {
        const targetPath = `${this.basePath}/pages/products.html?q=${encodeURIComponent(query)}`;
        window.location.href = targetPath;
      }
    };

    searchToggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      searchOverlay.classList.toggle("open");
      if (searchOverlay.classList.contains("open")) {
        searchOverlay.querySelector('input[name="q"]').focus();
      }
    });

    closeSearch.addEventListener("click", () => {
      searchOverlay.classList.remove("open");
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && searchOverlay.classList.contains("open")) {
        searchOverlay.classList.remove("open");
      }
    });

    document.addEventListener("click", (e) => {
      if (
        searchOverlay &&
        searchToggle &&
        searchOverlay.classList.contains("open") &&
        !searchOverlay.contains(e.target) &&
        !searchToggle.contains(e.target)
      ) {
        searchOverlay.classList.remove("open");
      }
    });

    desktopSearchForm?.addEventListener("submit", (e) => handleSearch(e, desktopSearchForm));
  }
}

customElements.define("app-header", AppHeader);
