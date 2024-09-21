import '../../public/css/card.css'
import '../../public/css/style.css'

import GetBlogs from './GetBlogs';

let Blogs = await GetBlogs()


Blogs.forEach((a: any) => {
    document.querySelector<HTMLDivElement>('#Section-Card')!.innerHTML += `
    <div class="blog-card">
        <img class="blog-img" src="../../public/images/${a.images[0]}" />
        <div class="text-overlay">

            <h2>${a.name}</h2>
            <p>${a.description}<br><a href="/pages/blogs?id=${a.name}" class="read-more">Voir plus</a></p>

        </div>
    </div>`
})



// setupCounter(document.querySelector < HTMLButtonElement > ('#counter') !)