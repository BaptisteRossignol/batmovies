import axios from 'axios';

const searchByIdAPI = (url, apiKey) => (id, callback) => {
  const request = axios.get(`${url}movie/${id}?api_key=${apiKey}&language=fr-FR`);

  request.then(({ data }) => callback(data));
};

export default searchByIdAPI;
