import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import '../scss/main.scss';
import searchAPI from "./services/searchAPI";

const search = searchAPI("https://www.omdbapi.com/", "5bfbda98");

search("avengers", results => {
  console.log(results);
});