import React, { useState, useEffect, useContext } from "react";
import Header from "./Header";
import Details from "./Details";
import Overview from "./Overview";
import Chart from "./Chart";
import Navbar from "./Navbar";
import StockContext from "../context/StockContext";
import { fetchStockDetails, fetchQuote } from "../utils/api/stock-api";
import NewsGrid from "./NewsGrid"
import Alert from '@mui/material/Alert';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const Dashboard = () => {
  
  const [items, setItems] = useState([])
  const [category, setCategory] = useState("general")
  const [showAlert, setShowAlert] = useState(false);

  var date = (new Date()).toISOString().split('T')[0];
  

  const [value, setValue] = useState(dayjs(date));


  

  const { stockSymbol } = useContext(StockContext);
  console.log(stockSymbol)
  useEffect (() => {fetch(`https://finnhub.io/api/v1/company-news?symbol=${stockSymbol}&from=${value.format('YYYY-MM-DD')}&to=${value.format('YYYY-MM-DD')}&token=${process.env.REACT_APP_API_KEY}`)
  .then(res =>
  res. json())
  .then (data => setItems (data))
  }, [stockSymbol,value])

  const [stockDetails, setStockDetails] = useState({});

  const [quote, setQuote] = useState({});

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stockSymbol);
        setStockDetails(result);
      } catch (error) {
        setStockDetails({});
        console.log(error);
      }
    };

    const updateStockOverview = async () => {
      try {
        const result = await fetchQuote(stockSymbol);
        setQuote(result);
        if(stockSymbol!="FB"){
        setShowAlert(true);

          setTimeout(() => {
            setShowAlert(false);
          }, 3000);

        }



        

      } catch (error) {
        setQuote({});
        console.log(error);
      }
    };

    updateStockDetails();
    updateStockOverview();

  }, [stockSymbol]);
  return (
    <div>
      {showAlert &&
        <Alert>
          Loaded successfully
        </Alert>
}

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
        
      <Overview
          symbol={stockSymbol}
          price={quote.pc}
          change={quote.d}
          changePercent={quote.dp}
          currency={stockDetails.currency}
        />

      </div>
      <div className="row-span-2 xl:row-span-3">
        <Details details={stockDetails} />
      </div>
    </div>
    <div><h1 className="title">See the latest stock news!</h1>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
    </LocalizationProvider>
    <NewsGrid items = {items}/>
    </div>


    </div>
    
  );
};

export default Dashboard;
