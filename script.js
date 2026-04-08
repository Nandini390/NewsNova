const API_URL="/api/news?q=";

window.addEventListener('load', ()=> fetchNews("World"));
async function fetchNews(query){
    const res= await fetch(`${API_URL}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    console.log(data);

    if (data.status === "error") {
        alert(`Error: ${data.message}`);
        return;
    }

    if (!data.articles || data.articles.length === 0) {
        alert("No articles found.");
        return;
    }

    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer=document.getElementById("cards-container");
    const newsCardTemplate=document.getElementById("template-news-card");
    cardsContainer.innerHTML=""; // Clear previous articles
    
    articles.forEach(article=>{
        if(!article.urlToImage) return; // Skip articles without images

        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImage=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDescription=cardClone.querySelector('#news-desc');

    newsImage.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDescription.innerHTML=article.description;
    
    const date=new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata"
    })
    newsSource.innerHTML=`${article.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url, "_blank");
    })
}

let currSelectedNav= null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    if(currSelectedNav) {
        currSelectedNav.classList.remove("active");
    }
    currSelectedNav=navItem;
    currSelectedNav.classList.add("active");
}

const searchButton=document.getElementById("search-button");
const searchText=document.getElementById("search-text");
searchButton.addEventListener('click', ()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    currSelectedNav=null; // Reset selected nav item
});
