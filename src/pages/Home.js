import React, { useState, useEffect } from 'react';
import tmdbInstance from "../utils/tmdbInstance";
import newsInstance from "../utils/newsInstance";

import EntertainmentNews from "../components/entertainment-news/EntertainmentNews";

const Home = () => {
  const [filmsInTheaters, setFilmsInTheaters] = useState([]);
  const [trendingFilms, setTrendingFilms] = useState([]);
  const [entertainmentNews, setEntertainmentNews] = useState([]);

  const fetchFilmsInTheaters = async () => {
    const response = await tmdbInstance.get("movie/now_playing", {
      params: { api_key: process.env.REACT_APP_TMDB_API_KEY }
    });
    const { data } = response;
    setFilmsInTheaters(data && data.results);
  }

  const fetchTrendingFilms = async () => {
    const response = await tmdbInstance.get("movie/now_playing", {
      params: { api_key: process.env.REACT_APP_TMDB_API_KEY }
    });
    const { data } = response;
    setTrendingFilms(data && data.results);
  }

  const fetchEntertainmentNews = async () => {
    const response = await newsInstance.get("top-headlines?country=us&category=entertainment", 
    {
      params: { apiKey: process.env.REACT_APP_NEWSAPI_API_KEY }
    });
    const { data } = response;
    setEntertainmentNews(data && data.articles);
  }

  useEffect(() => {
    fetchFilmsInTheaters();
    fetchTrendingFilms();
    fetchEntertainmentNews();
  }, [])

  return (
    <div>
      <h2>Currently Showing</h2>
      {filmsInTheaters.map((item, index) => <li key={index}>{item.title}</li>)}
      <h2>Trending</h2>
      {trendingFilms.map((item, index) => <li key={index}>{item.title}</li>)}
      <h2>Entertainment News</h2>
      <EntertainmentNews news={entertainmentNews} />
    </div>
  );
}

export default Home;
