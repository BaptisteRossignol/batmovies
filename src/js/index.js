import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import logo_batmovies from "../img/logo_batmovies.png";
import another_poster from "../img/another_poster.png";

import '../scss/main.scss';
import searchAPI from "./services/searchAPI";
import latestAPI from "./services/latestAPI";
import searchByIdAPI from "./services/searchByIdAPI";

const linkAPI = "https://api.themoviedb.org/3/";
const keyAPI = "7773119c011cc12e9264e289fc360af2";

const search = searchAPI(linkAPI, keyAPI);
const latest = latestAPI(linkAPI, keyAPI);
const searchById = searchByIdAPI(linkAPI, keyAPI);

function time_convert(num) { 
  let hours = Math.floor(num / 60);  
  let minutes = num % 60;
  return hours + "h" + minutes;         
}

search("avengers", results => {
});

latest(results => {
  let latestMovies = results.results;
  console.log(latestMovies);
  let content = '';
  
  latestMovies.forEach(function(movie)  {
    searchById(movie.id, movie => {
      const date = new Date(movie.release_date);
      const dateMovie = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();

      console.log(movie);
  
      content += '<div class="col-md-8 movie">';
  
      if (movie.poster_path == null) {
        content += '<img src="dist/' + another_poster + '" alt="Aucune affiche disponible pour ce film">'
      } else {
        content += '<img src="https://image.tmdb.org/t/p/w500/' + movie.poster_path + '" class="movie-image" />';
      }
  
      content += '<div class="movie-description">';
      content += '<div class="description-top"><p class="movie-title">' + movie.title + '</p><i style="color: red;" class="fas fa-heart"></i></div>';
      content += '<p class="movie-release-date"><i class="far fa-calendar-alt"></i>' + dateMovie;
      
      if (movie.runtime == 0 || movie.runtime == null) {
        content += '</p>';
      } else {
        content += ' | ' + time_convert(movie.runtime) + '</p>';
      }

      if (movie.overtime === "") {
        content += "<p class='movie-overview'>Aucune description n'est disponible pour ce film</p>";
      } else {
        content += '<p class="movie-overview">' + movie.overview + '</p>';
      }

      content += '</div>';
      content += '</div>';

      document.getElementById("movies-latest").innerHTML = content;
    })
  });
});

document.getElementById("logo_batmovies").innerHTML = '<img src="dist/' + logo_batmovies + '" alt="Logo BatMovies">';