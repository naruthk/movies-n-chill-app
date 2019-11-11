import React from 'react';
import LazyLoad from 'react-lazyload';
import "./NormalLayout.scss";

const NormalLayout = props => {

  return (
    <div className={`NormalLayout ${props.className}`}>
      <div className="navigation">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/news">News</a></li>      
          <li><a href="/compare">Compare</a></li>       
        </ul>		
      </div>
      <div className="NormalLayout__wrapper">
        {props.children}
      </div>
      <LazyLoad height={200}>
        <div className="footer center">
          <p>&copy; 2019 | <strong>Movies "n" Chill</strong> by Naruth Kongurai</p>
        </div>
      </LazyLoad>
    </div>
  )
}

export default NormalLayout;
