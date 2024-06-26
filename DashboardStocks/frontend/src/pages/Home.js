import React from "react";
import Search from "../components/Search";

const Home = ({ name }) => {
  return (
    <>
    
      <div className="xl:px-32">
        <h1 className="text-5xl">{name}</h1>
        
      </div>
    </>
  );
};

export default Home;