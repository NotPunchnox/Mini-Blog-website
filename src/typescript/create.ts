import '../../public/css/style.css';
import '../../public/css/blog.css';
import '../../public/css/input.css';

import GetBlogs from './GetBlogs';
import GetUsers from './GetUsers';

let Blogs = await GetBlogs();
let users = await GetUsers();

const UserID = localStorage.getItem('id');
if (!UserID || !users.find((a: USER) => a.id === UserID)) {
    window.location.href = "/";
}

interface USER {
    id: string;
    name: string;
    avatar: string;
}

const userDiv = document.getElementById("user") as HTMLDivElement | null;
const descriptionInput = document.getElementById("description") as HTMLTextAreaElement | null;
const contentInput = document.getElementById("blog-content") as HTMLTextAreaElement | null;
const imageInput = document.getElementById("imageUpload") as HTMLInputElement;
const imagePreview = document.getElementById("imagePreview") as HTMLDivElement;
const Title = document.getElementById("Title") as HTMLInputElement;

const currentUser = users.find((a: USER) => a.id === UserID);


if (currentUser && userDiv) {
    const { name, avatar } = currentUser;
    userDiv.innerHTML = `<img src="../${avatar}" alt="avatar">\n<h3>${name}</h3>`;
} else {
    console.error('Utilisateur non trouvé.');
}

imageInput.addEventListener('change', handleImageUpload);

function handleImageUpload() {
    const files = imageInput.files;
    imagePreview.innerHTML = "";
    if (files) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement("img");
                img.src = e.target?.result as string;
                img.style.width = "100px";
                img.style.margin = "10px";
                imagePreview.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    }
}

// const blogId = window.location.search.replace('?id=', '').replace(/%20/g, ' ');

export default async function Post() {
    console.log(!descriptionInput?.value || !contentInput?.value || !Title?.value || UserID)
    if (!descriptionInput?.value || !contentInput?.value || !Title?.value || !UserID) {
        return alert('Veuillez compléter tous les champs');
    }

    if (Blogs.find((a: any) => a.name === Title.value)) {
        return alert('Le nom: ' + Title.value + ' est déjà utilisé.');
    }

    const formData = new FormData();
    
    formData.append('name', Title.value);
    formData.append('description', descriptionInput.value);
    formData.append('content', contentInput.value);
    formData.append('author', UserID || "");

    const files = document.querySelector<HTMLInputElement>('#imageUpload')?.files;
    if (files) {
        Array.from(files).forEach(file => {
            formData.append('images', file);
        });
    }

    try {
        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Erreur: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Images téléchargées:', data.images);
        await setTimeout(() => '', 5000)
        window.location.href = `/pages/blogs?id=${Title.value}`
    } catch (error) {
        console.error('Erreur lors de l\'upload:', error);
    }
}