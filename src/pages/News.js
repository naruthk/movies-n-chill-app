import React, { useEffect, useState } from 'react';
import newsInstance from "../utils/newsInstance";

import NormalLayout from "../layouts/NormalLayout";
import EntertainmentNews from "../components/entertainment-news/EntertainmentNews";

const News = () => {
  const [entertainmentNews, setEntertainmentNews] = useState([]);


  const fetchEntertainmentNews = async () => {
    const response = await newsInstance.get("top-headlines?country=us&category=entertainment", 
    {
      params: { apiKey: process.env.REACT_APP_NEWSAPI_API_KEY }
    });
    const { data } = response;
    setEntertainmentNews(data && data.articles);
  }

  useEffect(() => {
    fetchEntertainmentNews();
  }, [])

  return (
    <NormalLayout>
      <h2 className="padded-content">Entertainment News</h2>
      <EntertainmentNews news={entertainmentNews} />
    </NormalLayout>
  );
}

export default News;
