import '../../public/css/style.css';
import '../../public/css/blog.css';
import '../../public/css/auth.css';

const Base_site = `http://172.23.128.1:3001`;
// const Base_site = "https://mini-blog-website.onrender.com";

const usernameInput = document.querySelector<HTMLInputElement>('#username')!;
const passwordInput = document.querySelector<HTMLInputElement>('#password')!;
const errorMessage = document.querySelector<HTMLParagraphElement>('#errorMessage')!;


export async function login() {
    console.log("login")
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (!username || !password) {
        errorMessage.textContent = 'Veuillez entrer votre nom d\'utilisateur et votre mot de passe.';
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';

    try {
        const response = await fetch(`${Base_site}/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username,password
            })
        });

        if (response.ok) {
            response.json().then(data => {
                console.log(data)
                localStorage.setItem("id", data?.id);
                alert('Connexion réussi !');
            window.location.href = window.location.origin
            })
        } else {
            const errorData = await response.json();
            errorMessage.textContent = errorData.message || 'Une erreur est survenue lors de la connexion.';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        errorMessage.textContent = 'Une erreur est survenue lors de la connexion au serveur.';
        errorMessage.style.display = 'block';
    }
}

const sendButton = document.querySelector<HTMLButtonElement>('#send')!;
sendButton.addEventListener('click', login);
