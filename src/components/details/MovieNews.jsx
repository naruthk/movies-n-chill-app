import React, { Fragment } from 'react';

import "../entertainment-news/EntertainmentNews.scss";

import EntertainmentNews from "../entertainment-news/EntertainmentNews";

const MovieNews = props => {
  return (
    <Fragment>
      <h2 className="padded-content">News</h2>
      <EntertainmentNews news={props.news} />
    </Fragment>
  )
};

export default MovieNews;
