const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search")
console.log(search)

async function getMovies (url)  {
    const result = await fetch(url);
    const data = await result.json();
    showMovies(data.results)
}
getMovies(API_URL);

// TODO : Create function that will draw movies on screen



// TODO : Create function that will render rating of the movie


//TODO : navigate a new page for single movie


// TODO : create function that will search for movies


function showMovies(movies) {
    (main.innerHTML = ""),
    movies.forEach((movie) => {
        const {title,poster_path,vote_average,overview,release_date,id} = movie;
        const movieEl = document.createElement("div")

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
    
  movieEl.addEventListener("click", () => {
    window.location.href=`movie.html?id=${id}`
  })
  main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "bg-green-400";
    }else if (vote >=6) {
        return "bg-yellow-400";
    }else {
        return "bg-red-400";
    }

}


form.addEventListener("submit",(e) => {
    //not refresh when clicking search button
    e.preventDefault();
    const searchTerm = search.value;

    if(searchTerm === "") {
      return getMovies(API_URL)
    }else{
      getMovies(SEARCH_API + searchTerm)
    }
    
    
})

