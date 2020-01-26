import axios from 'axios';

const searchAPI = (url, apiKey) => (search, callback) => {
  const request = axios.get(
    `${url}search/movie?api_key=${apiKey}&language=fr-FR&query=${search}&page=1&include_adult=false`,
  );

  request.then(({ data }) => callback(data));
};

export default searchAPI;
