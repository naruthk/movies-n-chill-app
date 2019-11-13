import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Legend,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import tmdbInstance from "../utils/tmdbInstance";

import GridItem from "../components/ui-kit/GridItem";
import NormalLayout from "../layouts/NormalLayout";

const Interesting = () => {
  const [trendingFilms, setTrendingFilms] = useState([]);
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
      results.splice(11); // due to API limitation, we can only do less than the original (20);
    }
    // setTrendingFilms(results);

    // Map over each initialResponse's results and store as an object
    const requestsAllMoviesDetail = results.map(item => {
      const { id: movieId } = item;
      return tmdbInstance.get(`movie/${movieId}`, {
        params: { api_key: process.env.REACT_APP_TMDB_API_KEY }
      });
    });

    // For each object, we grab the results then set to state
    Promise.all(requestsAllMoviesDetail).then(values => {
      // We ignore movies with "0" budget value to make the graph pretty!
      const filteredForNonZeroBudget = values.filter(item => item.data.budget !== 0);
      setTrendingFilms(filteredForNonZeroBudget.map(item => item.data));

      const mappedToArray = filteredForNonZeroBudget.map(item => {
          const { title, budget, revenue, vote_average, } = item.data;
          return { title, budget, revenue, vote_average }
        });
      setData(mappedToArray)
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <NormalLayout>
      <div className="padded-content">
        <h2>Interesting!</h2>
        <h4 className="center">Correlation Between Trending Films (This Week) and Revenues</h4>
      </div>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 10, right: 10, left: 60, bottom: 10
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Legend verticalAlign="top" height={36}/>
            <Tooltip />

            <Line name="Budget" type="monotone" dataKey="budget" stroke="#F26D85" />
            <Line name="Revenue" type="monotone" dataKey="revenue" stroke="#A4BF41" />

            <Area type="monotone" dataKey="budget" stackId="1" stroke="#F26D85" fill="#F26D85" />
            <Area type="monotone" dataKey="revenue" stackId="1" stroke="#A4BF41" fill="#A4BF41" />
            <Area type="monotone" dataKey="vote_average" stackId="1" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="padded-content">
        <section className="grid">
          {trendingFilms.map(item => {
            const id = item.id;
            const photo = `${process.env.REACT_APP_TMDB_IMAGE_URI}${item.poster_path}`;
            const title = item.title;
            const subtitle = item.release_date;

            return (
              <GridItem
                id={id}
                key={id}
                photo={photo}
                title={title}
                subtitle={subtitle}
                isMovie
              />
            );
          })}
        </section>
      </div>
    </NormalLayout>
  );
}

export default Interesting;
