import axios from 'axios';

const getByYear = (url, apiKey) => (year, callback) => {
  const request = axios.get(
    `${url}discover/movie?api_key=${apiKey}&language=fr-FR&include_adult=false&include_video=false&page=1&primary_release_year=${year}`,
  );

  request.then(({ data }) => callback(data));
};

export default getByYear;
