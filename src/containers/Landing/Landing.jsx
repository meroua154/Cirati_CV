import React from "react";
import Search from "../Landing/components/Search";
import  Value from "../Landing/components/Value";
import  Jobs  from "../Landing/components/Jobs";

const Landing = () => {
  return (
    <div>
       <Search />
        <Jobs />
        <Value />
    </div>
  );
};

export default Landing;