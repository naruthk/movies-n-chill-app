import React from 'react';

import GridItem from "../ui-kit/GridItem";

const MovieCastCrew = props => {
  const { cast, crew } = props;

  const renderCast = () => {
    const castObj = Object.assign({}, cast);

    return (
      <section className="grid">
        {Object.entries(castObj).map((_, value) => {
          const item = castObj[value];
          const id = item.cast_id;
          const photo = `${process.env.REACT_APP_TMDB_IMAGE_URI}${item.profile_path}`;
          const title = item.character;
          const subtitle = item.name;

          return (
            <GridItem
              id={id}
              key={id}
              photo={photo}
              title={title}
              subtitle={subtitle}
              isMovie={false}
            />
          );
        })}
      </section>
    )
  };

  const renderCrew = () => {
    const crewObj = Object.assign({}, crew);

    return (
      <section className="grid">
        {Object.entries(crewObj).map((_, value) => {
          const item = crewObj[value];
          const id = item.cast_id;
          const photo = `${process.env.REACT_APP_TMDB_IMAGE_URI}${item.profile_path}`;
          const title = item.name;
          const subtitle = item.job;

          return (
            <GridItem
              id={id}
              key={id}
              photo={photo}
              title={title}
              subtitle={subtitle}
              isMovie={false}
            />
          );
        })}
      </section>
    )
  };

  return (
    <div className="MovieCastCrew__wrapper padded-content">
      <div className="column">
        <h2>Cast</h2>
        {renderCast()}
      </div>
      <div className="column">
        <h2>Crew</h2>
        {renderCrew()}
      </div>
    </div>
  );
}

export default MovieCastCrew;
