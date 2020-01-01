import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import 'bootstrap/js/src/tab';

import logoBatmovies from '../img/logo_batmovies.png';
import anotherPoster from '../img/another_poster.png';

import '../scss/main.scss';
import searchAPI from './services/searchAPI';
import latestAPI from './services/latestAPI';
import searchByIdAPI from './services/searchByIdAPI';

const linkAPI = 'https://api.themoviedb.org/3/';
const keyAPI = '7773119c011cc12e9264e289fc360af2';

const search = searchAPI(linkAPI, keyAPI);
const latest = latestAPI(linkAPI, keyAPI);
const searchById = searchByIdAPI(linkAPI, keyAPI);

function timeConvert(num) {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;
  return `${hours}h${minutes}`;
}

window.deleteFavorite = function (id) {
  const element = document.getElementById(id);
  element.style.display = 'none';
  sessionStorage.removeItem(id);
  displayFavorites();
}

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

window.changeHeart = function (id) {
  const favoriteMovies = Object.keys(sessionStorage);
  const element = document.getElementById(id);

  if (favoriteMovies.includes(id.toString())) {
    element.classList.remove('fas');
    element.classList.add('far');
    element.style.color = '#000';
    sessionStorage.removeItem(id);
  } else {
    element.classList.remove('far');
    element.classList.add('fas');
    element.style.color = '#ff0000';
    sessionStorage.setItem(id, id);
  }
}

window.displayFavorites = function () {
  let content = '<div class="col-md-12"><h2>Mes films favoris 💕</h2></div>';
  const favoriteMovies = Object.keys(sessionStorage);

  if (favoriteMovies.length > 0) {
    favoriteMovies.forEach((movie) => {
      searchById(movie, (oneMovie) => {
        if (favoriteMovies.includes(oneMovie.id.toString())) {
          const date = new Date(oneMovie.release_date);
          const dateMovie = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
          let overviewSlice = oneMovie.overview;
          if (overviewSlice.length > 199) {
            overviewSlice = `${oneMovie.overview.slice(0, 150)}...`;
          }

          content += '<div class="col-md-6"><div class="movie">';

          if (oneMovie.poster_path == null) {
            content += `<img src="dist/${anotherPoster}" alt="Aucune affiche disponible pour ce film">`;
          } else {
            content += `<img src="https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}" class="movie-image" />`;
          }

          content += `<div class="movie-description">
                        <div class="description-top">
                          <p class="movie-title">${oneMovie.title}</p>`;

          content += `<i id="${oneMovie.id}" onclick="deleteFavorite(${oneMovie.id})" class="far fa-times-circle"></i>`;
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
            <div class="star-rating-red" style="width: ${oneMovie.vote_average * 10}%">
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

          content += `<button type="button" class="btn btn-light movie-details"><a onclick="displayOneMovie(${oneMovie.id})">Voir les détails</a></button></div>`;
          content += '</div></div>';
          document.getElementById('movies-favorites').innerHTML = content;
        }
      });
    });

  } else {
    content += "<p>Vous n'avez aucun film favoris 😔</p>";
    document.getElementById('movies-favorites').innerHTML = content;
  }

  const itemMovie = document.getElementById('movie');
  itemMovie.style.display = 'none';
  const itemLatest = document.getElementById('latest');
  itemLatest.style.display = 'none';
  const itemFavorite = document.getElementById('favorites');
  itemFavorite.style.display = 'flex';
  const itemSearch = document.getElementById('search');
  itemSearch.style.display = 'none';
};

// Display latest movies function
window.displayLatest = function () {
  latest((results) => {
    const latestMovies = results.results;
    let content = '<h2>Derniers films sortis 🎥</h2>';
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
          content += `<i id="${oneMovie.id}" onclick="changeHeart(${oneMovie.id})" style="color: #ff0000" class="fas fa-heart"></i>`;
        } else {
          content += `<i id="${oneMovie.id}" onclick="changeHeart(${oneMovie.id})" class="far fa-heart"></i>`;
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
          <div class="star-rating-red" style="width: ${oneMovie.vote_average * 10}%">
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

        content += `<button type="button" class="btn btn-light movie-details"><a onclick="displayOneMovie(${oneMovie.id})">Voir les détails</a></button></div>`;
        content += `</div>`;

        document.getElementById('movies-latest').innerHTML = content;
      });
    });
    const itemMovie = document.getElementById('movie');
    itemMovie.style.display = 'none';
    const itemLatest = document.getElementById('latest');
    itemLatest.style.display = 'flex';
    const itemFavorite = document.getElementById('favorites');
    itemFavorite.style.display = 'none';
    const itemSearch = document.getElementById('search');
    itemSearch.style.display = 'none';
  });
}

// Search movies function
window.displaySearch = function () {
  const inputVal = document.getElementById('input-search').value;
  const favoriteMovies = Object.keys(sessionStorage);

  search(inputVal, (results) => {
    const latestMovies = results.results;
    let content = '<div class="col-md-12"><h2>Résultat de recherche</h2></div>';

    latestMovies.forEach((movie) => {
      searchById(movie.id, (oneMovie) => {
        const date = new Date(oneMovie.release_date);
        const dateMovie = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        let overviewSlice = oneMovie.overview;
        if (overviewSlice.length > 199) {
          overviewSlice = `${oneMovie.overview.slice(0, 150)}...`;
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
          content += `<i id="${oneMovie.id}" onclick="changeHeart(${oneMovie.id})" style="color: #ff0000" class="fas fa-heart"></i>`;
        } else {
          content += `<i id="${oneMovie.id}" onclick="changeHeart(${oneMovie.id})" class="far fa-heart"></i>`;
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
          <div class="star-rating-red" style="width: ${oneMovie.vote_average * 10}%">
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

        content += `<button type="button" class="btn btn-light movie-details"><a onclick="displayOneMovie(${oneMovie.id})">Voir les détails</a></button></div>`;
        content += '</div>';
        document.getElementById('movies-search').innerHTML = content;
      });
    });
      // content += "<p>Vous n'avez aucun film favoris 😔</p>";
      // document.getElementById('movies-search').innerHTML = content;

    const itemMovie = document.getElementById('movie');
    itemMovie.style.display = 'none';
    const itemLatest = document.getElementById('latest');
    itemLatest.style.display = 'none';
    const itemFavorite = document.getElementById('favorites');
    itemFavorite.style.display = 'none';
    const itemSearch = document.getElementById('search');
    itemSearch.style.display = 'flex';
    movieFilter();
  });
}

// Display one movie function
window.displayOneMovie = function(id) {
  searchById(id, (oneMovie) => {
    const date = new Date(oneMovie.release_date);
    const dateMovie = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    let overviewSlice = oneMovie.overview;
    if (overviewSlice.length > 199) {
      overviewSlice = `${oneMovie.overview.slice(0, 250)}...`;
    }

    let content = '<div class="movie">';

    if (oneMovie.poster_path == null) {
      content += `<img src="dist/${anotherPoster}" alt="Aucune affiche disponible pour ce film">`;
    } else {
      content += `<img src="https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}" class="movie-image" />`;
    }

    content += `<div class="movie-description">
                  <div class="description-top">
                    <p class="movie-title">${oneMovie.title}</p>`;

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
      <div class="star-rating-red" style="width: ${oneMovie.vote_average * 10}%">
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

    content += '</div></div>';
    document.getElementById('movie-one').innerHTML = content;

    const itemMovie = document.getElementById('movie');
    itemMovie.style.display = 'block';
    const itemLatest = document.getElementById('latest');
    itemLatest.style.display = 'none';
    const itemFavorite = document.getElementById('favorites');
    itemFavorite.style.display = 'none';
    const itemSearch = document.getElementById('search');
    itemSearch.style.display = 'none';
  });
}

movieFilter();
displayLatest();

document.getElementById('logo_batmovies').innerHTML = `<img src="dist/${logoBatmovies}" alt="Logo BatMovies">`;