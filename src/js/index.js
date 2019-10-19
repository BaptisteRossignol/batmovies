import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import '../scss/main.scss';
import searchAPI from "./services/searchAPI";
import latestAPI from "./services/latestAPI";
import searchByIdAPI from "./services/searchByIdAPI";

const linkAPI = "https://api.themoviedb.org/3/";
const keyAPI = "7773119c011cc12e9264e289fc360af2";

const search = searchAPI(linkAPI, keyAPI);
const latest = latestAPI(linkAPI, keyAPI);
const searchById = searchByIdAPI(linkAPI, keyAPI);

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
  
      if (movie.poster_path != null) {
        content += '<img src="https://image.tmdb.org/t/p/w500/' + movie.poster_path + '" class="movie-image" />';
      } else {
        content += '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg" class="movie-image" />';
      }
  
      content += '<div class="movie-description">';
      content += '<p class="movie-title">' + movie.title + '</p>';
      content += '<p class="movie-release-date"><i class="far fa-calendar-alt"></i>' + dateMovie + ' | </p>';
      content += '<p class="movie-overview">' + movie.overview + '</p>';
      content += '</div>';
      content += '</div>';

      document.getElementById("movies-latest").innerHTML = content;
    })
  });
});
