import axios from 'axios';

const creditsMovie = (url, apiKey) =>  (idMovie, callback) => {
  const request = axios.get(
    `${url}movie/${idMovie}/videos?api_key=${apiKey}&language=fr-FR`
  );

  request.then(({ data }) => callback(data));
};

export default creditsMovie;
