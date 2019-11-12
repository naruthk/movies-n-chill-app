import React from 'react';

import "./Compare.scss";

import MovieDetails from "../details/MovieDetails";

const CompareDetails = props => {
  const { leftSelection, rightSelection, options } = props;

  const mapSelectionToDetails = selectedId => {
    options.forEach(item => {
      if (item.id === selectedId) {
        return <MovieDetails details={item} />
      }
    });
  }

  return (
    <div className="Compare__wrapper">
      <div className="flex-container">
        <div className="flex-item">
          {mapSelectionToDetails(leftSelection)}
        </div>
        <div className="flex-item">
          {mapSelectionToDetails(rightSelection)}
        </div>
      </div>
    </div>
  );
}

export default CompareDetails;
