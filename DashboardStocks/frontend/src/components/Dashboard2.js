import React, { useState, useEffect, useContext } from "react";
import Header from "./Header2";
import Details from "./Details";
import Overview from "./Overview";
import Chart from "./Chart2";
import Navbar from "./Navbar";
import StockContext from "../context/StockContext";
import { fetchStockDetails, fetchQuote } from "../utils/api/stock-api";


const Dashboard2 = () => {

  



  const [stockDetails, setStockDetails] = useState({});

  const [quote, setQuote] = useState({});

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails("AAPL");
        setStockDetails(result);
      } catch (error) {
        
      }
    };

    const updateStockOverview = async () => {
      try {
        const result = await fetchQuote("AAPL");
        setQuote(result);
      } catch (error) {
 
      }
    };


  });
  return (
    <div
      className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand ${
        "bg-neutral-100"
      }`}
    >
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        <Header name={stockDetails.name} />
      </div>
      <div className="md:col-span-2 row-span-4">
        <Chart />
      </div>
      <div>
        
     

      </div>
      
    </div>
  );
};

export default Dashboard2;
