/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect }  from 'react';

import tmdbInstance from "../utils/tmdbInstance";
import newsInstance from "../utils/newsInstance";

import NormalLayout from "../layouts/NormalLayout";
import MovieDetails from "../components/details/MovieDetails";
import MovieCastCrew from "../components/details/MovieCastCrew";
import MovieNews from "../components/details/MovieNews";

const Details = props => {
  const movieId = props.match.params.movieId;

  const [details, setDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    tmdbInstance.get(`movie/${movieId}`, {
      params: { api_key: process.env.REACT_APP_TMDB_API_KEY }
    })
      .then(async response => {
        const { data } = response;
        setDetails(data);

        // Note: Need to find a way to deal with useEffect's race condition.
        // At the moment, the only way to immediately obtain the movie's title
        // (which we will used to query for news) is available right here.
        const query = data.title && `${data.title.split(" ").join("+")} film`;
        const newsRes = await newsInstance.get(`everything?q=${query}`, {
          params: { apiKey: process.env.REACT_APP_NEWSAPI_API_KEY }
        });
        const { data: newsResData } = newsRes;
        setNews(newsResData && newsResData.articles);
        })
      .catch(err => props.history.push('/not-found'));
  }, []);

  useEffect(() => {
    async function fetchCastCrew() {
      try {
        const response = await tmdbInstance.get(`/movie/${movieId}/credits`, {
          params: { api_key: process.env.REACT_APP_TMDB_API_KEY }
        });
        const { data } = response;
        setCast(data.cast);
        setCrew(data.crew)
      } catch (err) {
        console.warn("Cannot get cast and crew:", err);
      }
    };
    fetchCastCrew();
  }, []);

  return (
    <NormalLayout>
      <MovieDetails movieId={movieId} details={details} />
      <MovieCastCrew cast={cast} crew={crew} />
      <MovieNews news={news} />
    </NormalLayout>
  );
}

export default Details;
