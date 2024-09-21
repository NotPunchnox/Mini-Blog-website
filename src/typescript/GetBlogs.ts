export default async function () {

    try {
        let r = await fetch('http://localhost:3000/blogs');

        if (!r.ok) {
            throw new Error(`Erreur: ${r.statusText}`);
        }

        return await r.json();

    } catch (error) {
        console.error('Erreur lors de la récupération des blogs:', error);
    }
}