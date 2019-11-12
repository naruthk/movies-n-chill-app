import React, { useContext } from 'react';
import LazyLoad from 'react-lazyload';
import "./NormalLayout.scss";

import { AppContext } from "../components/app-context/AppContext";

const NormalLayout = props => {
  const { itemsToCompare } = useContext(AppContext);

  return (
    <div className={`NormalLayout ${props.className}`}>
      <div className="navigation">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/news">News</a></li>      
          <li>
            <a href="/compare">Compare
              <i className="notification">
                {itemsToCompare && itemsToCompare.length}
              </i>
            </a>
          </li>
          <li><a href="/interesting">Interesting</a></li>
        </ul>		
      </div>
      <div className="NormalLayout__wrapper">
        {props.children}
      </div>
      <LazyLoad height={200}>
        <div className="footer center">
          <p>&copy; 2019 | <strong>Movies "n" Chill</strong></p>
        </div>
      </LazyLoad>
    </div>
  )
}

export default NormalLayout;
