class AppFooter extends HTMLElement {
  connectedCallback() {
    const isPageFolder = window.location.pathname.includes("/pages/")
    const basePath = isPageFolder ? ".." : "."

    this.innerHTML = `
      <footer class="footer" style="background-color: var(--color-bg-alt); padding-top: 4rem; margin-top: auto;">
        <div class="container grid-footer">
          <div>
            <h4>Sobre a Caputeeno</h4>
            <p style="color: var(--color-text-light); margin-top: 1rem;">
              Moda autêntica para quem busca expressar sua personalidade com elegância e seriedade.
            </p>
          </div>
          
          <div>
            <h4>Links Rápidos</h4>
            <ul style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <li><a href="${basePath}/index.html">Início</a></li>
              <li><a href="${basePath}/pages/products.html">Roupas</a></li>
              <li><a href="${basePath}/pages/about.html">Nossa História</a></li>
              <li><a href="${basePath}/pages/login.html">Login</a></li>
            </ul>
          </div>
          
          <div>
            <h4>Ajuda</h4>
            <ul style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <li><a href="#">Trocas e Devoluções</a></li>
              <li><a href="#">Política de Privacidade</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4>Social</h4>
            <ul style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Facebook</a></li>
            </ul>
          </div>
        </div>
        
        <div class="container" style="border-top: 1px solid var(--color-border); padding: 2rem 0; margin-top: 4rem; text-align: center; color: var(--color-text-light);">
          <p>&copy; 2025 Caputeeno. Todos os direitos reservados.</p>
        </div>
      </footer>
    `
  }
}

customElements.define("app-footer", AppFooter)
