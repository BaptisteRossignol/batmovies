import '../scss/main.scss';
import searchAPI from "./services/searchAPI";

const search = searchAPI("https://www.omdbapi.com/", "5bfbda98");

search("avengers", results => {
  console.log(results);
});