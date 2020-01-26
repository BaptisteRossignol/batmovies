import axios from 'axios';

const creditsMovie = (url, apiKey) => (idMovie, callback) => {
  const request = axios.get(
    `${url}movie/${idMovie}/credits?api_key=${apiKey}`
  );

  request.then(({ data }) => callback(data));
};

export default creditsMovie;
