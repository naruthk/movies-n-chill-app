/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect, useContext }  from 'react';

import tmdbInstance from "../utils/tmdbInstance";

import NormalLayout from "../layouts/NormalLayout";
import CompareSelector from "../components/compare/CompareSelector";
import CompareDetails from "../components/compare/CompareDetails";

import { AppContext } from "../components/app-context/AppContext";

const Compare = () => {

  const { itemsToCompare, clearCompareList } = useContext(AppContext);

  const [details, setDetails] = useState([]);
  const [leftSelection, setLeftSelection] = useState(null);
  const [rightSelection, setRightSelection] = useState(null);

  useEffect(() => {
    const requests = itemsToCompare.map(
      id => tmdbInstance.get(`movie/${id}`, {
        params: { api_key: process.env.REACT_APP_TMDB_API_KEY }
      }
    ));
    Promise.all(requests).then(values => {
      const dataObjects = values.map(item => item.data);
      setDetails(dataObjects)
    });
  }, [itemsToCompare]);

  const handleSelection = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "leftSelector") {
      setLeftSelection(value);
    } else {
      setRightSelection(value);
    }
  }

  return (
    <NormalLayout>
      {itemsToCompare.length !== 0 && (
        <button
          className="button button__slick float-right"
          onClick={clearCompareList}>
          <i className="material-icons">delete</i> Clear all items
        </button>
      )}
      <h2 className="padded-content">Compare</h2>
      {itemsToCompare.length !== 0 ? (
        <Fragment>
          <CompareSelector
            options={details}
            handleSelection={handleSelection}
          />
          <CompareDetails
            options={details}
            leftSelection={leftSelection}
            rightSelection={rightSelection}
          />
        </Fragment>
      ) : (
        <div className="center">
          <h4>Add items to compare!</h4>
          <img
            src={"../../assets/images/theaters.svg"}
            alt="Theaters"
            width="500px"
          />
        </div>
      )}
    </NormalLayout>
  );
}

export default Compare;
