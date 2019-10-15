import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import '../scss/main.scss';
import searchAPI from "./services/searchAPI";
import latestAPI from "./services/latestAPI";

const search = searchAPI("https://api.themoviedb.org/3/", "7773119c011cc12e9264e289fc360af2");
const latest = latestAPI("https://api.themoviedb.org/3/", "7773119c011cc12e9264e289fc360af2");

search("avengers", results => {
});


latest(results => {
  let latestMovies = results.results;
  console.log(latestMovies);
  let html = latestMovies.length ? '<div class="latest-movies row">' : '';
  
  for (let i= 0; i < latestMovies.length; i++) {
    html += '<div class="col-3 movie">';
    html += '<img src="https://image.tmdb.org/t/p/w500/' + latestMovies[i].poster_path + '" class="movie-image" />';
    html += '<p class="movie-title">' + latestMovies[i].title + '</p>';
    html += '</div>';
  }

  html += latestMovies.length ? '</div>' : '';

  document.getElementById("movies-latest").innerHTML = html;
});
