import React, { useState, useEffect } from 'react';
import tmdbInstance from "../utils/tmdbInstance";

import NormalLayout from "../layouts/NormalLayout";

const Interesting = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const initialResponse = await tmdbInstance.get("trending/all/week", {
      params: { api_key: process.env.REACT_APP_TMDB_API_KEY }
    });
    const { data } = initialResponse;
    const results = data.results;
    if (!results) {
      return [];
    } else {
      results.splice(10); // due to API limitation, we can only do less than the original (20);
    }

    // Map over each initialResponse's results and store as an object
    const requestsAllMoviesDetail = results.map(item => {
      const { id: movieId } = item;
      return tmdbInstance.get(`movie/${movieId}`, {
        params: { api_key: process.env.REACT_APP_TMDB_API_KEY }
      });
    });

    // For each object, we grab the results then set to state
    Promise.all(requestsAllMoviesDetail).then(values => {
      const dataObjects = values.map(item => {
        const { title, budget, revenue, vote_average } = item.data;
        return { title, budget, revenue, vote_average }
      });
      setData(dataObjects)
    });
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <NormalLayout>
      <h2 className="padded-content">Interesting!</h2>
      <div>{data.length}</div>
    </NormalLayout>
  );
}

export default Interesting;
