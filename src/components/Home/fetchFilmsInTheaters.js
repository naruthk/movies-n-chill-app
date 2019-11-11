import tmdbInstance from "../../utils/tmdbInstance";

const fetchFilmsInTheaters = async () => {
  return await tmdbInstance.get("movie/now_playing", {
    params: {
      api_key: process.env.REACT_APP_TMDB_API_KEY
    }
  });
  // const { data } = response;
  // setFilmsInTheaters(data && data.results);
}

export default fetchFilmsInTheaters;