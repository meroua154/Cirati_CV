import React from 'react';

const Description = ({ description }) => {
  return (
    <div className="description-container">
      <h1 className="description-title font-bold text-lg">Qui nous sommes?</h1>
      <p className="description-text text-wrap text-sm mt-4 tracking-wider">{description}</p>
    </div>
  );
};

export default Description;

