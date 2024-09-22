import '../../public/css/style.css';
import '../../public/css/blog.css';
import '../../public/css/auth.css';

// const Base_site = "http://localhost:8080";
const Base_site = "https://mini-blog-website.onrender.com";

const avatarInput = document.querySelector<HTMLInputElement>('#avatarInput')!;
const avatarPreview = document.querySelector<HTMLImageElement>('#avatar')!;
const usernameInput = document.querySelector<HTMLInputElement>('#username')!;
const passwordInput = document.querySelector<HTMLInputElement>('#password')!;
const errorMessage = document.querySelector<HTMLParagraphElement>('#errorMessage')!;

avatarInput.addEventListener('change', () => {
    const file = avatarInput.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            avatarPreview.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }
});

export async function register() {
    const username = usernameInput.value;
    const password = passwordInput.value;
    const avatarFile = avatarInput.files?.[0];

    if (!username || !avatarFile) {
        errorMessage.textContent = 'Veuillez entrer un nom d\'utilisateur et sélectionner un avatar.';
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('file', avatarFile);

    try {
        const response = await fetch(`${Base_site}/register`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            response.json().then(data => {
                localStorage.setItem("id", data?.id);
            })
            alert('Enregistrement réussi !');
            window.location.href = "/"
        } else {
            const errorData = await response.json();
            errorMessage.textContent = errorData.message || 'Une erreur est survenue lors de l\'enregistrement.';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        errorMessage.textContent = 'Une erreur est survenue lors de la connexion au serveur.';
        errorMessage.style.display = 'block';
    }
}

const sendButton = document.querySelector<HTMLButtonElement>('#sendButton')!;
sendButton.addEventListener('click', register);
