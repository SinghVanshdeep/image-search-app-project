let data;
let i = 0;
let searchQuery;


const resultDiv = document.getElementById("result");
const showMoreDiv = document.createElement("div");
const showMoreButton = document.createElement("button");

async function apiCall(){
    const data = await fetch(`https://api.unsplash.com/search/photos/?query=${searchQuery}&per_page=50&client_id=HXUORnTaxPV4n80RI5wOkcncdvuvpmz8qesqeDeOTq8`);

    return data.json();
};

function createContent(){

    while (i != data.results.length){
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("content", "my-3");

        const imgBox = document.createElement("div")
        imgBox.setAttribute("id", "imgBox");

        const img = document.createElement("img");
        img.setAttribute("src", data.results[i].urls.thumb);
        img.setAttribute("alt", data.results[i].alt_description);

        const descriptionBox = document.createElement("div");
        descriptionBox.setAttribute("id", "descriptionBox");

        const text = document.createElement("p");
        text.setAttribute("id", "description");
        text.textContent = data.results[i].alt_description;

        contentDiv.append(imgBox, descriptionBox);
        imgBox.appendChild(img);
        descriptionBox.appendChild(text);
        resultDiv.appendChild(contentDiv);

        if (i % 10 === 0 && i != 0){
            contentDiv.classList.add("hide");

            showMoreDiv.setAttribute("id", "showMore")

            showMoreButton.setAttribute("id", "more")
            showMoreButton.classList.add("btn", "btn-dark", "my-3");
            showMoreButton.textContent = "Show More";

            showMoreDiv.appendChild(showMoreButton);
            resultDiv.appendChild(showMoreDiv);

            showMoreButton.onclick = function(){
                contentDiv.classList.remove("hide");
                i++;
                showMoreDiv.replaceChildren();
                createContent();
            }
            break;
        }
        i++;

    }
};

document.getElementById("search").addEventListener("click", function(event){
    searchQuery = document.getElementById("query").value;

    async function display(){
        const imgData = await apiCall();
        data = imgData;
        i = 0;

        resultDiv.replaceChildren(); // clear out the entire result div
        createContent();
    };

    display();
});
