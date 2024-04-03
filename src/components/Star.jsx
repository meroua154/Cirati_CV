import React, { useState } from 'react';
import { HiStar } from 'react-icons/hi';

const Star = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <HiStar
      className="text-3xl"
      onClick={handleClick}
      style={{ color: clicked ? '#f7fc00' : 'black' }}
    />
  );
};

export default Star;
