import React, { Fragment } from 'react';
import currency from "currency.js";

import "./Compare.scss";

import MovieDetails from "../details/MovieDetails";

const CompareDetails = props => {
  const { leftSelection, rightSelection, options } = props;

  const itemIndexLookup = selectedId => {
    let updatedIndex = -1;
    options.forEach((item, index) => {
      if (item.id === Number(selectedId)) {
        updatedIndex = index;
      }
    });
    return updatedIndex;
  };

  const renderBasicMoveInfo = selectedId => {
    const index = itemIndexLookup(selectedId);
    return (
      <MovieDetails
        details={options[index]}
        isInComparingMode={true}
      />
    );
  }

  const renderRatings = selectedId => {
    const index = itemIndexLookup(selectedId);
    const currentItem = options[index];
    const { vote_average, vote_count } = currentItem;
    return (
      <Fragment>
        <h2>{vote_average} / 10</h2>
        <h4>Ratings ({vote_count} voters)</h4>
      </Fragment>
    );
  }

  const renderBudget = selectedId => {
    const index = itemIndexLookup(selectedId);
    const budget = currency(options[index].budget, { 
      separator: ',',
      formatWithSymbol: true 
    }).format();
    const revenue = currency(options[index].revenue, { 
      separator: ',',
      formatWithSymbol: true 
    }).format();

    return (
      <Fragment>
        <h2 style={{color: "green"}}>{revenue}</h2>
        <h4>Revenue</h4>
        <h2 style={{color: "darkgray"}}>{budget}</h2>
        <h4>Budget</h4>
      </Fragment>
    );
  }

  const renderGenres = selectedId => {
    const index = itemIndexLookup(selectedId);
    const genres = options[index].genres;
    return (
      <Fragment>
        <h2>{genres.map(item => item.name).join(", ")}</h2>
        <h4>Genres ({genres.length})</h4>
      </Fragment>
    );
  }


  return (
    leftSelection || rightSelection) && (
      <div className="Compare__wrapper">
        {/* BASIC INFO */}
        <div className="flex-container">
          <div className="flex-item">
            {leftSelection && renderBasicMoveInfo(leftSelection)}
          </div>
          <div className="flex-item">
            {rightSelection && renderBasicMoveInfo(rightSelection)}
          </div>
        </div>
        {/* RATINGS */}
        <div className="flex-container padded-content bordered-top">
          <div className="flex-item">
            {leftSelection && renderRatings(leftSelection)}
          </div>
          <div className="flex-item">
            {rightSelection && renderRatings(rightSelection)}
          </div>
        </div>
        {/* BUDGET */}
        <div className="flex-container padded-content bordered-top">
          <div className="flex-item">
            {leftSelection && renderBudget(leftSelection)}
          </div>
          <div className="flex-item">
            {rightSelection && renderBudget(rightSelection)}
          </div>
        </div>
        {/* GENRES */}
        <div className="flex-container padded-content bordered-top">
          <div className="flex-item">
            {leftSelection && renderGenres(leftSelection)}
          </div>
          <div className="flex-item">
            {rightSelection && renderGenres(rightSelection)}
          </div>
        </div>
      )
    </div>
  );
}

export default CompareDetails;
