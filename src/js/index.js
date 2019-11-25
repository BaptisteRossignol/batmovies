import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import logoBatmovies from '../img/logo_batmovies.png';
import anotherPoster from '../img/another_poster.png';

import '../scss/main.scss';
// import searchAPI from './services/searchAPI';
import latestAPI from './services/latestAPI';
import searchByIdAPI from './services/searchByIdAPI';

const linkAPI = 'https://api.themoviedb.org/3/';
const keyAPI = '7773119c011cc12e9264e289fc360af2';

// const search = searchAPI(linkAPI, keyAPI);
const latest = latestAPI(linkAPI, keyAPI);
const searchById = searchByIdAPI(linkAPI, keyAPI);

function timeConvert(num) {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;
  return `${hours}h${minutes}`;
}

// search('avengers', (results) => {
//   console.log(results);
// });

function myFavourites() {
  document.getElementById('movies-latest').innerHTML = '<p>test</p>';
}

latest((results) => {
  const latestMovies = results.results;
  let content = '<h2>Derniers films sortis</h2>';
  const favoriteMovies = Object.keys(sessionStorage);
  console.log(favoriteMovies);

  latestMovies.forEach((movie) => {
    searchById(movie.id, (oneMovie) => {
      console.log(favoriteMovies.includes(oneMovie.id));
      const date = new Date(oneMovie.release_date);
      const dateMovie = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

      content += '<div class="col-md-8"><div class="movie">';

      if (oneMovie.poster_path == null) {
        content += `<img src="dist/${anotherPoster}" alt="Aucune affiche disponible pour ce film">`;
      } else {
        content += `<img src="https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}" class="movie-image" />`;
      }

      content += `<div class="movie-description">
                    <div class="description-top">
                      <p class="movie-title">${oneMovie.title}</p>`;

      if (favoriteMovies.includes(oneMovie.id.toString())) {
        content += `<div id="${oneMovie.id}" onClick="sessionStorage.removeItem(id)">
                      <i style="color: red;" class="fas fa-heart"></i>
                    </div>`;
      } else {
        content += `<div id="${oneMovie.id}" onClick="sessionStorage.setItem(id, id)">
                      <i style="color: red;" class="far fa-heart"></i>
                    </div>`;
      }

      content += `</div>
                  <p class="movie-release-date"><i class="far fa-calendar-alt"></i>${dateMovie}`;

      if (oneMovie.runtime === 0 || oneMovie.runtime == null) {
        content += '</p>';
      } else {
        content += ` | ${timeConvert(oneMovie.runtime)}</p>`;
      }

      if (oneMovie.overview === '') {
        content += "<p class='movie-overview'>Aucune description n'est disponible pour ce film.</p>";
      } else {
        content += `<p class="movie-overview">${oneMovie.overview}</p>`;
      }

      content += '</div></div>';
      content += '</div>';

      document.getElementById('movies-latest').innerHTML = content;
    });
  });
});

document.getElementById(
  'logo_batmovies',
).innerHTML = `<img src="dist/${logoBatmovies}" alt="Logo BatMovies">`;
