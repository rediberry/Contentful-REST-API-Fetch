const client = contentful.createClient({
    space: 'iph7ajthw3a3',
    accessToken: '7eX3T8FKvI3v2LCIPVoNLs5HafOjeo7FIZXCk8CGvk8'
})

const d = document,
w = window,
$site = d.getElementById("site"),
$posts = d.getElementById("posts"),
$loader = d.querySelector(".loader"),
$template = d.getElementById("post-template").content,
$fragment = d.createDocumentFragment();

async function getPosts(){
    $loader.style.display = "block";
    try{
            const contentful = await client.getEntries({content_type:'noticia'});
            let posts = contentful.items;
            console.log(...posts)
            posts.forEach(el=>{
            // let categories = "",
            // tags = "";
            // el._embedded["wp:term"][0].forEach(el=>categories += `<li>${el.name}</li>`);
            // el._embedded["wp:term"][1].forEach(el=>tags += `<li>${el.name}</li>`);

            $template.querySelector(".post-image").src = el.fields.foto.fields.file.url;
            $template.querySelector(".post-image").alt = el.fields.title;
            $template.querySelector(".post-title").innerHTML = el.fields.title;
            // $template.querySelector(".post-author").innerHTML = `
            // <img src="${el._embedded.author[0].avatar_urls["48"]}" alt="${el.embedded.author[0].name}">
            // <figcaption>${el._embedded.author[0].name}</figcaption>
            // `;
            $template.querySelector(".post-date").innerHTML = new Date(el.fields.fecha).toLocaleDateString();
            // $template.querySelector(".post-link").href = el.link;
            // $template.querySelector(".post-excerpt").innerHTML = el.excerpt.rendered.replace("[&hellip;]","...");
            // $template.querySelector(".post-categories").innerHTML = `
            // <p>Categorías</p>
            // <ul>${categories}</ul>
            // `;
            // $template.querySelector(".post-tags").innerHTML = `
            // <p>Etiquetas</p>
            // <ul>${tags}</ul>
            // `;
            $template.querySelector(".post-content > article").innerHTML = el.fields.textoDeLaNoticia.content[0].content[0].value;

            let $clone = d.importNode($template, true);
            $fragment.appendChild($clone);
        })
        $posts.appendChild($fragment);
        $loader.style.display = "none";
    }
    catch (error){
        console.log(error);
        let message = error.statusText || "Ocurrió un error";
        $site.innerHTML = `<p>Error ${error.status}:${message}</p>`;
        $loader.style.display = "none";
    }
}

d.addEventListener("DOMContentLoaded",e =>{
    getPosts();
});

// w.addEventListener("scroll", e =>{
//     const { scrollTop, clientHeight, scrollHeight} = d.documentElement;
//     if (scrollTop + clientHeight >= scrollHeight){
//         console.log("cargar más posts")
//         page++;
//         getPosts();
//     }
// });