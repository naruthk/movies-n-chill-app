import React from 'react';
import "./NormalLayout.scss";

const NormalLayout = props => {

  return (
    <div className={`NormalLayout ${props.className}`}>
      <div className="navigation">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/movies">Movies</a></li>
          <li><a href="/shows">TV Shows</a></li>
          <li><a href="/news">News</a></li>      
          <li><a href="/compare">Compare</a></li>       
        </ul>		
      </div>
      <div className="NormalLayout__wrapper">
        {props.children}
      </div>
    </div>
  )
}

export default NormalLayout;
