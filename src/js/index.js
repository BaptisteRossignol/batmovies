import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import 'bootstrap/js/src/tab';

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

// function myFavourites() {
//   document.getElementById('movies-latest').innerHTML = '<p>test</p>';
// }

latest((results) => {
  const latestMovies = results.results;
  let content = '<h2>Derniers films sortis</h2>';
  const favoriteMovies = Object.keys(sessionStorage);

  latestMovies.forEach((movie) => {
    searchById(movie.id, (oneMovie) => {
      const date = new Date(oneMovie.release_date);
      const dateMovie = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      let overviewSlice = oneMovie.overview;
      if (overviewSlice.length > 199) {
        overviewSlice = `${oneMovie.overview.slice(0, 250)}...`;
      }

      content += '<div class="movie">';

      if (oneMovie.poster_path == null) {
        content += `<img src="dist/${anotherPoster}" alt="Aucune affiche disponible pour ce film">`;
      } else {
        content += `<img src="https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}" class="movie-image" />`;
      }

      content += `<div class="movie-description">
                    <div class="description-top">
                      <p class="movie-title">${oneMovie.title}</p>`;

      if (favoriteMovies.includes(oneMovie.id.toString())) {
        content += `<div id="${oneMovie.id}" class="favorite" onClick="sessionStorage.removeItem(id)">
                      <div id="change-heart">
                        <i style="color: red;" id="heart" class="fas fa-heart favorite"></i>
                      </div>
                    </div>`;
      } else {
        content += `<div id="${oneMovie.id}" class="favorite" onClick="sessionStorage.setItem(id, id)">
                      <div id="change-heart">
                        <i style="color: red;" id="heart" class="far fa-heart favorite"></i>
                      </div>
                    </div>`;
      }

      content += `</div>
                  <p class="movie-release-date"><i class="far fa-calendar-alt"></i>${dateMovie}`;

      if (oneMovie.runtime === 0 || oneMovie.runtime == null) {
        content += '</p>';
      } else {
        content += ` | ${timeConvert(oneMovie.runtime)}`;
      }

      content += `<div class="star-rating">
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        <div class="star-rating-yellow" style="width: ${oneMovie.vote_average * 10}%">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
      </div>`;

      if (overviewSlice === '') {
        content += "<p class='movie-overview'>Aucune description n'est disponible pour ce film.</p>";
      } else {
        content += `<p class="movie-overview">${overviewSlice}</p>`;
      }

      content += '<button type="button" class="btn btn-light movie-details">Voir les détails</button></div>';
      content += '</div>';

      document.getElementById('movies-latest').innerHTML = content;
    });
  });
});

function movieFilter() {
  let content = '<div class="movies-filter">';

  content += `<nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Filtrer</a>
    <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Trier</a>
  </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">Filtrer</div>
  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">Trier</div>
</div>`;
  content += '</div>';
  document.getElementById('movies-filter').innerHTML = content;
}
movieFilter();

document.getElementById('logo_batmovies').innerHTML = `<img src="dist/${logoBatmovies}" alt="Logo BatMovies">`;

// function changeHeart(id) {
//   const favoriteMovies = Object.keys(sessionStorage);
//   const element = document.getElementById(id).childNodes;
//   console.log(element);

//   if (favoriteMovies.includes(id.toString())) {
//     element.className.remove('fas');
//     element.className.add('far');
//   } else {
//     element.className.remove('far');
//     element.className.add('fas');
//   }
// }


// document.getElementById('change-heart').onclick = () => {
//   alert('NTM OHHHHHHHHHH');
// };
