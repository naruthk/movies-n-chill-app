import React from 'react';

import NormalLayout from "../layouts/NormalLayout";

const NotFound = () => {
  return (
    <NormalLayout>
      <div className="center">
        <h2>Not Found</h2>
        <h4>The content you are looking for cannot be found.</h4>
        <img
          src={"../../assets/images/theaters.svg"}
          alt="Not Found"
          width="500px"
        />
      </div>
    </NormalLayout>
  );
}

export default NotFound;
