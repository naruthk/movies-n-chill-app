import React from 'react';

import "./Compare.scss";

const CompareDetails = props => {
  const { leftSelection, rightSelection, options } = props;

  return (
    <div className="Compare__wrapper">
      <div className="flex-container">
        <div className="flex-item">
          <p>{leftSelection}</p>
          {/* <MovieDetail details={leftSelection} */}
        </div>
        <div className="flex-item">
          <p>{rightSelection}</p>
          {/* <MovieDetail details={rightSelection} */}
        </div>
      </div>
    </div>
  );
}

export default CompareDetails;
