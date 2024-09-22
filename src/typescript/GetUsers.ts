export default async function () {

    try {
        let r = await fetch('https://mini-blog-website.onrender.com/users');

        if (!r.ok) {
            throw new Error(`Erreur: ${r.statusText}`);
        }

        return await r.json();

    } catch (error) {
        console.error('Erreur lors de la récupération des blogs:', error);
    }
}