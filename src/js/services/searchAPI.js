import axios from "axios";

const searchAPI = (url, apiKey) =>  (search, callback) => {
    const request = axios.get(
        `${url}?s=${search}&apikey=${apiKey}`
    );

    request.then(({ data }) => callback(data));
};

export default searchAPI;