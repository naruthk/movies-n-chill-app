import React, { Fragment, useContext } from 'react';

import currency from "currency.js";

import { AppContext } from "../app-context/AppContext";

import "./MovieDetails.scss";

const IMAGE_PATH = "https://image.tmdb.org/t/p/original/";

const MovieDetails = props => {
  const { movieId, details, isInComparingMode } = props;

  const {
    backdrop_path,
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
  } = details;

  const { addItemToCompare, isInComparedList } = useContext(AppContext);

  const backgroundImageStyle = {
    background: backdrop_path ? `url(${IMAGE_PATH + backdrop_path}) center / cover no-repeat` : "#fff",
    height: "43vh"
  };
  
  return (
    <Fragment>
      <div className="MovieDetails__container">
        <div className="intro" style={backgroundImageStyle}>
          {!isInComparingMode && <div className="buttons" onClick={() => addItemToCompare(movieId)}>
            <i className="material-icons" >
              {!isInComparedList(movieId) ? "library_add": "delete"}
            </i>
            <span className="tooltip">{!isInComparedList(movieId) ? "Add to Compare List": "Remove from Compare List" }</span>
          </div>}
          <h1 className="title"><span className="underline">{title}</span></h1>
        </div>
        <div className="padded-content">
          <div className="description">
            <p><span className="tagline">{tagline}</span>{overview}</p>
          </div>
        </div>
      </div>
      {!isInComparingMode && (
        <Fragment>
          <section className="MovieDetails__full-details">
            <ul className="flex-container">
              <li className="flex-item">
                {release_date}
                <span className="detail-label">Release date</span>
              </li>
              <li className="flex-item">
                {runtime} minutes 
                {original_language && ` (${String(original_language).toUpperCase()})`}
                <span className="detail-label">Runtime</span>
              </li>
              <li className="flex-item">
                {vote_average} / 10 ({vote_count})
                <span className="detail-label">Average Ratings</span>
              </li>
              <li className="flex-item">
                {currency(budget, { 
                  separator: ',',
                  formatWithSymbol: true 
                }).format()}
                <span className="detail-label">Budget</span>
              </li>
              <li className="flex-item">
                <a href={homepage} title={title}>{title}'s</a>
                <span className="detail-label">Official Website</span>
              </li>
            </ul>
          </section>
          <section className="MovieDetails__full-details">
            <ul className="unbulleted-list">
              {production_companies && [...production_companies].map((company, index) => {
                const { logo_path, name } = company;
                return (
                  <li key={index}>
                    <img src={process.env.REACT_APP_TMDB_IMAGE_URI + logo_path} alt={name} className="production-companies-logo" />
                  </li>
                );
              })}
            </ul>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}

export default MovieDetails;
