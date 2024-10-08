// import '../../public/css/card.css'
import '../../public/css/style.css';
import '../../public/css/blog.css';

import GetBlogs from './GetBlogs';
import GetUsers from './GetUsers';

const Base_site = "https://mini-blog-website.onrender.com"

let Blogs = await GetBlogs();
let users = await GetUsers();

const blogId = window.location.search.replace('?id=', '').replace(/%20/g, ' ');

console.log(blogId)
const Info = Blogs.find((a: any) => a.name == blogId);

if (Info) {
    const author = users.find((a: any) => a.id === Info.author)

    document.querySelector<HTMLDivElement>('#App')!.innerHTML += `
        <div class="Bar">
            <div id="Nav">
                <a href="/">Home</a>
                <p>></p>
                <a>${Info.name}</a>
            </div>

            <h1>${Info.name}</h1>
            <div class="user">
                <img src="${Base_site}/image/${author?.avatar}" alt="avatar">
                <h3>${author?.name}</h3>
            </div>
        </div>

        <div id="Part2">
            <p id="descripion">${Info.description}</p>
            
            <div class="divider"></div>

            <div id="Content">
                ${Info.content.replace(/# (.*)/g, '<h2>$1</h2>')}
                <br/>
                <div id="ImagesContent">
                    ${String(Info.images.map((a: any) => `<img src="${Base_site}/image/${a}" alt="image${Date.now()}" class="blog-image">`)).replace(/,/, '')}
                </div>
            </div>
        </div>
    `;
} else {
    document.querySelector<HTMLDivElement>('#App')!.innerHTML = `
        <p class="error-message">/!\\ Blog not found !<br/><a href="/"  >back to Home</a></p>
    `;
}