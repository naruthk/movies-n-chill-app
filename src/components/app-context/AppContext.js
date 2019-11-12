import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AppContext = createContext();

const MAX_COMPARED_ITEM = 2;

const AppProvider = props => {
  const [itemsToCompare, setItemsToCompare] = useState([]);

  const splitAndConvertToArray = itemsToSplit => {
    const splitter = ",";
    return itemsToSplit.toString().split(splitter);
  };

  useEffect(() => {
    const items = Cookies.get("itemsToCompare");
    /*
      In cookies, itemsToCompare's value is in the form of either
        (1) "xxxx"  , or...
        (2) "xxxx,xxxx" (separated by commas)
      So we split by "," and convert back to array to store as state
    */
    if (!items) return;
    setItemsToCompare(splitAndConvertToArray(items));
  }, []);

  const checkIfAlreadyInComparedList = item => {
    return itemsToCompare.indexOf(item) !== -1;
  }

  /*
    Add item to the list of movies to compare.
    If the item already exists, take it out of the list.
    Save final state changes to cookies.
  */
  const addItemToCompare = item => {
    // Remove if the item aleady exists
    if (checkIfAlreadyInComparedList(item)) {
      const filteredItems  = itemsToCompare.filter(existingItem =>
        existingItem !== item 
      );
      if (filteredItems.length === 0) {
        Cookies.remove("itemsToCompare");
        return setItemsToCompare([]);
      }
      Cookies.set("itemsToCompare", filteredItems.toString());
      return setItemsToCompare(splitAndConvertToArray(filteredItems));
    }

    if (itemsToCompare.length >= MAX_COMPARED_ITEM) {
      return alert("Cannot compare more than 2 content");
    }

    const addedItems  = [...itemsToCompare, item];
    Cookies.set("itemsToCompare", addedItems.toString());
    return setItemsToCompare(splitAndConvertToArray(addedItems));
  };

  return (
    <AppContext.Provider value={{
      itemsToCompare,
      addItemToCompare,
      checkIfAlreadyInComparedList
    }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppProvider;
