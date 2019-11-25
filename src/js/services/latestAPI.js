import axios from 'axios';

const latestAPI = (url, apiKey) => (callback) => {
  const ladate = new Date();
  const dateMonth = ladate.getMonth() + 1;
  const fullDate = `${ladate.getFullYear()}-${dateMonth}-${ladate.getDate() < 10 ? '0' : ''}${ladate.getDate()}`;

  const request = axios.get(
    `${url}discover/movie?api_key=${apiKey}&language=fr-FR&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&release_date.lte=${fullDate}&with_original_language=fr`,
  );

  request.then(({ data }) => callback(data));
};

export default latestAPI;
