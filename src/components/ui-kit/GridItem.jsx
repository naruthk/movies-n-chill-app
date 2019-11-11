import React from 'react';
import "./GridItem.scss";

const GridItem = props => {
  const { id, title, subtitle, photo, isMovie } = props;

  const renderHTML = (
    <div className="grid-item">
      <img src={photo} alt={title} className="poster" />
      <div className="title">{title}</div>
      <div className="info">
        <span>{subtitle}</span>
      </div>
    </div>
  );

  return (
    isMovie ? (
      <a
        href={`/details/${id}`}
        title={title}
        target="_blank"
        rel="noopener noreferrer"
      >
        {renderHTML}
      </a>
     ) : renderHTML
  );
}

export default GridItem;
