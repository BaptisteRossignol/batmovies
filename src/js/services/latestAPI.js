import axios from "axios";

const latestAPI = (url, apiKey) =>  (callback) => {

    const ladate = new Date();
    const fullDate = ladate.getFullYear() + "-" + (ladate.getMonth()+1)+ "-" + ladate.getDate()

    const request = axios.get(
        `${url}discover/movie?api_key=${apiKey}&language=fr-FR&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&release_date.lte=${fullDate}`
    );

    request.then(({ data }) => callback(data));
};

export default latestAPI;