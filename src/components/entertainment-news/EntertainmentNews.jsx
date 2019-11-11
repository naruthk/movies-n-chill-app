import React from 'react';
import "./EntertainmentNews.scss";

const EntertainmentNews = props => {
  const { news } = props;

  const extractDateInformation = timestamp => {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    return {
      day: date.getDay(),
      month: date.getMonth(),
      year: date.getFullYear()
    }
  }

  const renderIndividualNewsBox = (article, index) => {
    const {
      title,
      description,
      author,
      url,
      urlToImage,
      publishedAt
    } = article;
    const { day, month, year } = extractDateInformation(publishedAt);

    const backgroundImageStyle = {
      background: urlToImage ? `url(${urlToImage}) center / cover no-repeat` : "#000"
    };

    return (
      <div className="news-article card" key={index}>
        <div className="wrapper" style={backgroundImageStyle}>
          <div className="header">
            <div className="date">
              <span className="day">{day}</span>
              <span className="month">/{month}</span>
              <span className="year">/{year}</span>
            </div>
          </div>
          <div className="data">
            <div className="content">
              <span className="author">{author}</span>
              <h2 className="title">
                <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
              </h2>
              <p className="text">{description}</p>
              <a href={url} target="_blank" rel="noopener noreferrer" className="button">Read more</a>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="Entertainment-News__PageLayout">
      <div className="row">
        {news.map(renderIndividualNewsBox)}
      </div>
    </div>
  );
}

export default EntertainmentNews;
