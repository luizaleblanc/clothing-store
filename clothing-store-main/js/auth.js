function getLoggedUser() {
    return JSON.parse(localStorage.getItem("loggedUser"));
}

function registerUser(name, email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || []; 
    const exists = users.some(u => u.email === email);
    if (exists) return false;

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    return true;
}

function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem("loggedUser", JSON.stringify(user));
        return true;
    }
    return false;
}

function redirectToLogin() {
    if (window.location.pathname.includes("/pages/")) {
        window.location.href = "login.html"; 
    } else {
        window.location.href = "pages/login.html"; 
    }
}

function confirmAccountRemoval(email) {
    const isConfirmed = confirm("Tem certeza absoluta que deseja excluir sua conta? Esta ação é irreversível.");
    
    if (isConfirmed) {
        if (removeUser(email)) {
            alert("Sua conta foi excluída com sucesso. Redirecionando para o login.");
            redirectToLogin();
        } else {
            alert("Erro ao excluir a conta. Tente novamente.");
        }
    } else {
        alert("Exclusão cancelada. Sua conta permanece ativa.");
    }
}

function logoutUser() {
    localStorage.removeItem("loggedUser");
    redirectToLogin();
}

function requestPasswordReset(email) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some(u => u.email === email);

    if (userExists) {
        localStorage.setItem("resetEmail", email);
        return true;
    }
    return false;
}

function performPasswordReset(email, newPassword) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.removeItem("resetEmail"); 
        return true;
    }
    return false;
}

function removeUser(emailToRemove) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.filter(user => user.email !== emailToRemove);

    if (updatedUsers.length < users.length) {
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        
        const logged = getLoggedUser();
        if (logged && logged.email === emailToRemove) {
            localStorage.removeItem("loggedUser");
        }
        return true;
    }
    return false;
}

function updateHeader() {
    const user = getLoggedUser();

    setTimeout(() => {
        const loginIcon = document.querySelector('.icon-btn[aria-label="Login"]');
        if (!loginIcon) return; 

        const loginPath = window.location.pathname.includes("/pages/") ? "login.html" : "pages/login.html";

        if (user) {
            const dropdownHTML = `
                <div class="profile-dropdown-container" id="profileDropdown">
                    <a href="#" class="icon-btn profile-trigger" aria-label="Perfil">
                        <span style="font-size:14px;">Olá, ${user.name.split(" ")[0]}</span>
                    </a>
                    <div class="dropdown-content">
                        <a href="javascript:logoutUser()">Finalizar Sessão</a>
                        <a href="javascript:confirmAccountRemoval('${user.email}')">Excluir Conta</a>
                    </div>
                </div>
            `;
            
            loginIcon.outerHTML = dropdownHTML;
            
            const profileDropdown = document.getElementById('profileDropdown');

            if (profileDropdown) {
                profileDropdown.addEventListener('click', function(e) {
                    const logoutLink = e.target.closest('a[href="javascript:logoutUser()"]');

                    if (logoutLink) {
                        e.stopPropagation(); 
                        return;
                    }

                    const trigger = e.target.closest('.profile-trigger');
                    if (trigger) {
                        e.preventDefault(); 
                        this.classList.toggle('open');
                    }
                });

                document.addEventListener('click', function(e) {
                    if (profileDropdown && !profileDropdown.contains(e.target)) {
                        profileDropdown.classList.remove('open');
                    }
                });
            }


        } else {
            loginIcon.href = loginPath;
            loginIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" 
                    stroke-width="1.5" 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            `;
        }
    }, 200);
}

document.addEventListener("DOMContentLoaded", updateHeader);

document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (!loginUser(email, pass)) {
        alert("Email ou senha incorretos! Tente novamente.");
        return;
    }

    window.location.href = "../index.html";
});

document.getElementById("registerForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();
    const confirmPass = document.getElementById("confirmPassword").value.trim(); 

    if (pass !== confirmPass) {
        alert("Erro: A senha e a confirmação de senha não coincidem!");
        return; 
    }
    
    if (!registerUser(name, email, pass)) {
        alert("Este email já está registrado!");
        return;
    }

    alert("Cadastro realizado com sucesso! Faça login para continuar.");
    window.location.href = "login.html";
});

document.getElementById("forgotPasswordForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("resetEmail").value.trim();

    if (requestPasswordReset(email)) {
        alert("Se o email estiver cadastrado, o link foi 'enviado'. Redirecionando para a redefinição...");
        window.location.href = "reset-password.html";
    } else {
        alert("Email não encontrado. Verifique se o digitou corretamente.");
    }
});

document.getElementById("resetPasswordForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = localStorage.getItem("resetEmail"); 
    if (!email) {
        alert("Erro: O processo de redefinição não foi iniciado. Volte e use o 'Esqueci minha senha'.");
        return;
    }

    const newPass = document.getElementById("newPassword").value.trim();
    const confirmNewPass = document.getElementById("confirmNewPassword").value.trim();

    if (newPass !== confirmNewPass) {
        alert("Erro: As novas senhas não coincidem!");
        return;
    }

    if (performPasswordReset(email, newPass)) {
        alert("Senha redefinida com sucesso! Faça login com sua nova senha.");
        window.location.href = "login.html";
    } else {
        alert("Erro ao redefinir. Tente iniciar o processo novamente.");
    }
});
