const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const movieContainer = document.getElementById("movie-container");
const totalPrice = document.getElementById("total-price");
const seatMap  = document.getElementById("seat-map");
const selectedSeatsCount = document.getElementById("selected-seats")
const buyButton = document.getElementById("buy-button")


const urlParamas = new URLSearchParams(window.location.search)

const movieId = urlParamas.get("id")
console.log(movieId)
getMovieDetails(API_URL);
async function getMovieDetails(API_URL) {
  const result = await fetch(API_URL);
  const data = await result.json();
  console.log(data.results);
  const movie = data?.results.find((movie) => movie.id === parseInt(movieId));
  showMovieDetails(movie);
}



function showMovieDetails(movie) {
    const {title,poster_path,vote_average,overview,release_date, id} = movie;
    const movieEl = document.createElement("div");

        movieEl.innerHTML = `
        <div class="py-3 sm:max-w-xl sm:mx-auto">
    <div class="bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-8 flex space-x-8">
      <div class="h-48 overflow-visible w-1/2">
          <img class="rounded-3xl shadow-lg" src="${IMG_PATH + poster_path}" alt="">
      </div>
      <div class="flex flex-col w-1/2 space-y-4">
        <div class="flex justify-between items-start">
          <h2 class="text-3xl font-bold">${title}</h2>
          <div class="${getClassByRate(vote_average)} font-bold rounded-xl p-2">${Math.round(vote_average)}</div>
        </div>
        <div>
          <div class="text-sm text-gray-400">Series</div>
          <div class="text-lg text-gray-800">${release_date}</div>
        </div>
          <p class=" text-gray-400 max-h-40 overflow-y-hidden">${overview.slice(0,70)}</p>
        <div class="flex text-2xl font-bold text-a">$9.99</div>
      </div>

    </div>
  </div>`;

  movieContainer.appendChild(movieEl);
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "bg-green-400";
  } else if (vote >= 6) {
    return "bg-yellow-400";
  } else {
    return "bg-red-400";
  }
}

const seatPrice = 10;
let selectedSeats = [];

const rows = 5;
const seatPerRow = 10;
const occupiedSeats = [44,  29, 41, 2, 42, 18, 34, 35, 49, 31, 24, 26, 43, 9, 13, 20, 5, 12, 28, 19, 8, 14, 37, 39,50];











function createSeatMap() {
  for(let i = 0;i < rows;i++) {
    const rowEl = document.createElement("div")
    rowEl.className = "flex justify-center"

    for( let j = 0 ; j < seatPerRow; j++) {
      const seatIndex = i * seatPerRow + j +1;
      const seatEl  = document.createElement("div");
      seatEl.classList.add("seat");

      if (occupiedSeats.includes(seatIndex)) {
        seatEl.classList.add("occupied")
      }

      seatEl.addEventListener("click", () => seatSelect(seatEl,seatIndex));
      rowEl.appendChild(seatEl);

    }
    seatMap.append(rowEl)
  }
}

createSeatMap();


function seatSelect(seatEl,seatIndex) {
  if (!seatEl.classList.contains("occupied")) {
    seatEl.classList.add("selected");
  }

  if (seatEl.classList.contains("selected")) {
    selectedSeats.push(seatIndex);
  }

  updateSummary();

}


function updateSummary() {
  selectedSeatsCount.innerText = selectedSeats.length;
  totalPrice.innerText = selectedSeats.length * seatPrice;

}

buyButton.addEventListener("click", () => {
  if (selectedSeats.length > 0) {
    const total = selectedSeats.length * seatPrice;
    const seatNumbers = selectedSeats.join(",");
    const id = movieId
    
    window.location.href = `checkout.html?seats=${seatNumbers}&totalPrice=${total}&id=${id}`;
  } else {
    alert("Please select at least one seat.");
  }
});


