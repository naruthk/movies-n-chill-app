import React from 'react';

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

  console.log(props.details);
  
  return (
    <main className="intro-section">
      <div className="container">
        <div className="intro">
          <h1 className="title"><span className="underline">{title}</span></h1>
        </div>
        <div className="image-holder">
          <img src={IMAGE_PATH + backdrop_path} alt={title} />
        </div>
        <div className="padded-content">
          <div className="description">
            <p><span className="tagline">{tagline}:</span>{overview}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;
