const accessKey = "Enter_your_api_key";
const searchForm = document.querySelector(".search");
const searchBox = document.querySelector(".search-inp");
const searchResult = document.querySelector(".pictures");
const showMoreBtn = document.querySelector(".show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
  if (!keyword) {
    alert("Please enter a search term.");
    return;
  }
  let url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    let data = await response.json();
    displayImages(data.results);
  } catch (error) {
    console.error(error.message);
    alert("Failed to fetch images. Please try again later.");
  }
}

function displayImages(results) {
  if (page === 1) searchResult.innerHTML = "";
  results.map((result) => {
    let img = document.createElement("img");
    img.src = result.urls.small;
    let imgLink = document.createElement("a");
    imgLink.href = result.links.html;
    imgLink.target = "_blank";
    imgLink.appendChild(img);
    searchResult.appendChild(imgLink);
  });
  showMoreBtn.style.display = results.length ? "block" : "none";
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  keyword = searchBox.value.trim();
  if (keyword) {
    page = 1;
    searchImages();
    searchBox.value = "";
  } else {
    alert("Please enter a search term.");
  }
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
