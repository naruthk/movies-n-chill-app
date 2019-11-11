import React from 'react';
import LazyLoad from 'react-lazyload';

import "./GridItem.scss";

const GridItem = props => {
  const { id, title, subtitle, photo, isMovie } = props;

  const renderHTML = (
    <LazyLoad height={200}>
      <div className="grid-item">
        <img src={photo} alt={title} className="poster" />
        <div className="title">{title}</div>
        <div className="info">
          <span>{subtitle}</span>
        </div>
      </div>
    </LazyLoad>
  );

  return (
    isMovie ? (
      <a
        href={`/details/${id}`}
        title={title}
      >
        {renderHTML}
      </a>
     ) : renderHTML
  );
}

export default GridItem;
