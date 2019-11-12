import React from 'react';

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

  const mapSelectionToDetails = selectedId => {
    const index = itemIndexLookup(selectedId);
    return (
      <MovieDetails
        details={options[index]}
        isInComparingMode={true}
      />
    );
  }

  return (
    <div className="Compare__wrapper">
      <div className="flex-container">
        <div className="flex-item">
          {leftSelection && mapSelectionToDetails(leftSelection)}
        </div>
        <div className="flex-item">
          {rightSelection && mapSelectionToDetails(rightSelection)}
        </div>
      </div>
    </div>
  );
}

export default CompareDetails;
