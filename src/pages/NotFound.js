import React from 'react';

import NormalLayout from "../layouts/NormalLayout";

const NotFound = () => {
  return (
    <NormalLayout className="center">
      <h2>Not Found</h2>
      <a
        href="https://www.freevector.com/free-theatre-icon-vector-24830"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={"../../assets/images/theaters.svg"}
          alt="Not Found"
          width="500px"
        />
      </a>
      <p>The content you are looking for cannot be found.</p>
    </NormalLayout>
  );
}

export default NotFound;
