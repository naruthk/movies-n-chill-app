/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect }  from 'react';

import tmdbInstance from "../utils/tmdbInstance";
import newsInstance from "../utils/newsInstance";

import NormalLayout from "../layouts/NormalLayout";
import MovieDetails from "../components/details/MovieDetails";

const Details = props => {
  const movieId = props.match.params.movieId;
  
  const [details, setDetails] = useState({});
  const [cast, setCast] = useState({});
  const [crew, setCrew] = useState({});
  const [videos, setVideos] = useState({});
  const [news, setNews] = useState({});

  useEffect(() => {
    // Fetch details about the movie
    async function fetchData() {
      try {
        const response = await tmdbInstance.get(`movie/${movieId}`, {
          params: { api_key: process.env.REACT_APP_TMDB_API_KEY }
        });
        const { data } = response;
        setDetails(data);
      } catch (err) {
        props.history.push('/not-found'); // Redirect to Not Found page if the details cannot be fetched
      }
    };
    fetchData();
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
        console.warn("Cannot get details:", err);
      }
    };
    fetchCastCrew();
  }, []);

  useEffect(() => {
    async function fetchNews() {
      const title = details && details.title;
      // To match the closest results, we append " film" as a suffix at the end.
      const query = title && `${title.split(" ").join("+")} film`;

      const response = await newsInstance.get(`everything?q=${query}`, {
        params: { apiKey: process.env.REACT_APP_NEWSAPI_API_KEY }
      });
      const { data } = response;
      setNews(data.articles);
    };
    fetchNews();
  }, []);

  useEffect(() => {
    async function fetchCastCrew() {
      try {
        const response = await tmdbInstance.get(`/movie/${movieId}/credits`, {
          params: {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: "en-US"
          }
        });
        const { data } = response;
        setCast(data.cast);
        setCrew(data.crew)
      } catch (err) {
        console.warn("Cannot find cast and crew:", err);
      }
    };
    fetchCastCrew();
  }, []);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await tmdbInstance.get(`movie/${movieId}/videos`, {
          params: {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: "en-US"
          }
        });
        const { data } = response;
        setVideos(data.results);
      } catch (err) {
        console.warn("Cannot find videos:", err);
      }
    };
    fetchVideos();
  }, []);

  return (
    <NormalLayout>
      <MovieDetails details={details} />
    </NormalLayout>
  );
}

export default Details;
