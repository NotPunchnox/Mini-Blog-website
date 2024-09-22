import '../../public/css/card.css'
import '../../public/css/style.css'
import '../../public/css/auth.css'
// import '../../public/css/blog.css'

import GetBlogs from './GetBlogs';
import GetUsers from './GetUsers';

let Blogs = await GetBlogs();
let Users = await GetUsers();
const Base_site = "https://mini-blog-website.onrender.com";


Blogs.forEach((a: any) => {
    document.querySelector<HTMLDivElement>('#Section-Card')!.innerHTML += `
    <div class="blog-card">
        <img class="blog-img" src="${Base_site}/image/${a.images[0]}" />
        <div class="text-overlay">

            <h2>${a.name}</h2>
            <p>${a.description}<br><a href="/pages/blogs?id=${a.name}" class="read-more">Voir plus</a></p>

        </div>
    </div>`
})

if(!localStorage.getItem('id') || !Users.find((a: any) => a.id == localStorage.getItem('id'))) {
    document.querySelector<HTMLDivElement>('#profil')!.innerHTML = `<button><a href="/pages/login">login</a></button><button href="/pages/register"><a href="/pages/register">register</a></button>`
} else {
    let user = Users.find((a: any) => a.id == localStorage.getItem('id'))
    document.querySelector<HTMLDivElement>('#profil')!.innerHTML = `<div class="user"><img src="${Base_site}/image/${user?.avatar}" alt="avatar">\n<h3>${user?.name}</h3></div>`;
}

// setupCounter(document.querySelector < HTMLButtonElement > ('#counter') !)