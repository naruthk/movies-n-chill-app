import React from 'react';

import "./Compare.scss";

const CompareSelector = props => {
  const { options, handleSelection } = props;

  const renderHTML = name => (
    <div className="flex-item padded-content">
      <select name={name} className="compare-selector" onChange={handleSelection}>
        <option defaultValue value={"Choose"}>Choose content to compare!</option>
        {
          options.map(item => <option key={item.title} value={item.id}>{item.title}</option>)
        }
      </select>
    </div>
  )
  return (
    <div className="Compare__wrapper">
      <div className="flex-container">
        {renderHTML("leftSelector")}
        {renderHTML("rightSelector")}
      </div>
    </div>
  );
}

export default CompareSelector;
