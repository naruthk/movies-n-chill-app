import React, { Fragment } from 'react';

import "./MovieDetails.scss";

const IMAGE_PATH = "https://image.tmdb.org/t/p/original/";

const MovieDetails = props => {
  const {
    imdb_id,
    backdrop_path,
    poster_path,
    homepage,
    budget,
    original_language,
    release_date,
    runtime,
    tagline,
    title,
    overview,
    vote_average,
    vote_count,
    production_companies
  } = props.details;

  const backgroundImageStyle = {
    background: backdrop_path ? `url(${IMAGE_PATH + backdrop_path}) center / cover no-repeat` : "#fff",
    height: "43vh"
  };
  
  return (
    <Fragment>
      <div className="MovieDetails__container">
        <div className="intro" style={backgroundImageStyle}>
          <h1 className="title"><span className="underline">{title}</span></h1>
        </div>
        <div className="padded-content">
          <div className="description">
            <p><span className="tagline">{tagline}</span>{overview}</p>
          </div>
        </div>
      </div>
      <section className="MovieDetails__full-details">
      <ul class="flex-container">
        <li class="flex-item">1</li>
        <li class="flex-item">2</li>
        <li class="flex-item">3</li>
        <li class="flex-item">4</li>
        <li class="flex-item">5</li>
        <li class="flex-item">6</li>
      </ul>
      </section>
    </Fragment>
  );
}

export default MovieDetails;
