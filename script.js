

const accessKey = "ueHSue3RJYQnPXe6GO1Ah0u_pP_yp_G1qzCbjOthbNE";
const formEl = document.querySelector("#form-id");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");
const audio = new Audio('MouseClick.mp3');
let page = 1;

function fetchImages(page, inputData) {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => resolve(data.results))
            .catch(error => reject(error));
    });
}

function displayImages(results) {
    if (page === 1) {
        searchResults.innerHTML = "";
    }

    results.forEach(result => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");

        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageLink.addEventListener("click", () => {
            audio.play();
        });

        image.addEventListener("click", () => {
            audio.play();
        });

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}

function searchImages() {
    const inputData = inputEl.value;

    fetchImages(page, inputData)
        .then(displayImages)
        .catch(error => {
            console.error('Error:', error);
        });
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
    audio.play();
});

showMore.addEventListener("click", () => {
    audio.play();
    searchImages();
});
