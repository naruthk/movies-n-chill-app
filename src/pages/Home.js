import React, { useState, useEffect } from 'react';
import tmdbInstance from "../utils/tmdbInstance";

import NormalLayout from "../layouts/NormalLayout";
import GridItem from "../components/ui-kit/GridItem";

const Home = () => {
  const [filmsInTheaters, setFilmsInTheaters] = useState([]);
  const [trendingFilms, setTrendingFilms] = useState([]);
  const fetchFilmsInTheaters = async () => {
    const response = await tmdbInstance.get("movie/now_playing", {
      params: { api_key: process.env.REACT_APP_TMDB_API_KEY }
    });
    const { data } = response;
    setFilmsInTheaters(data && data.results);
  }

  const fetchTrendingFilms = async () => {
    const response = await tmdbInstance.get("trending/all/week", {
      params: { api_key: process.env.REACT_APP_TMDB_API_KEY }
    });
    const { data } = response;
    setTrendingFilms(data && data.results);
  }

  useEffect(() => {
    fetchFilmsInTheaters();
    fetchTrendingFilms();
  }, [])

  return (
    <NormalLayout>
      <h2 className="padded-content">Currently Showing</h2>
      <section class="grid">
        {filmsInTheaters.map(item => {
          const id = item.id;
          const photo = `${process.env.REACT_APP_TMDB_IMAGE_URI}${item.poster_path}`;
          const title = item.title;
          const subtitle = item.release_date;

          return (
            <GridItem
              id={id}
              key={id}
              photo={photo}
              title={title}
              subtitle={subtitle}
              isMovie
            />
          );
        })}
      </section>
      <h2 className="padded-content">Trending</h2>
      <section class="grid">
        {trendingFilms.map(item => {
          const id = item.id;
          const photo = `${process.env.REACT_APP_TMDB_IMAGE_URI}${item.poster_path}`;
          const title = item.title;
          const subtitle = item.release_date;

          return (
            <GridItem
              id={id}
              key={id}
              photo={photo}
              title={title}
              subtitle={subtitle}
              isMovie
            />
          );
        })}
      </section>
    </NormalLayout>
  );
}

export default Home;
