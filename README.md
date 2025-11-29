<img width="1888" height="796" alt="Captura de tela 2025-11-23 192001" src="https://github.com/user-attachments/assets/ca7a9762-a37b-4eb2-a5a9-22613190485f" />
<h1> Caputeeno | E-commerce de Moda </h1> 

## Sobre o Projeto

O **Caputeeno** é uma aplicação web de e-commerce focada em vestuário minimalista e de alta qualidade. O conceito do projeto gira em torno da "Elegância em cada detalhe", oferecendo uma interface limpa, sofisticada e intuitiva.

O objetivo técnico deste projeto foi desenvolver uma experiência de loja virtual completa utilizando **JavaScript Puro (Vanilla JS)**, sem dependência de frameworks complexos, demonstrando domínio sobre manipulação de DOM, persistência de dados locais e componentização via Web Components nativos.

## Funcionalidades Atuais

O projeto já conta com as seguintes funcionalidades implementadas:

* **Catálogo de Produtos:** Exibição dinâmica de produtos com grid responsivo.
* **Detalhes do Produto:** Página interna com seleção de imagens, descrição e tamanhos.
* **Carrinho de Compras Inteligente:**
    * Adição e remoção de itens.
    * Ajuste de quantidade.
    * Cálculo automático de subtotal e total.
    * Persistência de dados via `localStorage` (o carrinho não se perde ao atualizar a página).
    * Modal de confirmação para remover itens.
* **Experiência do Usuário (UX):**
    * **Dark Mode:** Alternância completa de tema (Claro/Escuro) com persistência da preferência do usuário.
    * **Feedback Visual:** Notificações tipo "Toast" ao adicionar itens e modais para ações destrutivas.
    * **Banner Rotativo:** Carrossel automático na página inicial (Hero Section).
* **Componentização:** Cabeçalho (`<app-header>`) e Rodapé (`<app-footer>`) reutilizáveis em todas as páginas.

## Tecnologias Utilizadas

* **HTML5 Semântico**
* **CSS3 Moderno:**
    * Uso extensivo de CSS Variables (`var(--color-...)`) para temas.
    * Flexbox e CSS Grid para layouts responsivos.
    * Pseudoelementos e animações (`transition`, `keyframes`).
* **JavaScript (ES6+):**
    * Manipulação de DOM.
    * `CustomElementsRegistry` para Web Components.
    * `localStorage` API.

## Status do Projeto e Pendências

O projeto está em constante evolução. Atualmente, o fluxo de compra (navegação -> carrinho -> checkout visual) está funcional. No entanto, as seguintes funcionalidades relacionadas à autenticação **estão pendentes e serão desenvolvidas em breve**:

- [ ] **Tela de Login:** Autenticação de usuários.
- [ ] **Tela de Cadastro:** Registro de novos clientes.
- [ ] **Esqueci minha Senha:** Fluxo de recuperação de conta.

## Como Rodar o Projeto

Como o projeto utiliza tecnologias nativas e caminhos relativos, você pode rodá-lo de duas formas:

1.  **Extensão Live Server (Recomendado):** Se estiver usando o VS Code, instale a extensão "Live Server", clique com o botão direito no `index.html` e escolha "Open with Live Server".
2.  **Navegador:** Basta abrir o arquivo `index.html` diretamente em seu navegador preferido (Chrome, Firefox, Edge).

Desenvolvido com 🖤 e café.
