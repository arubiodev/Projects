import React, { useState } from 'react';
import Card from "./Card";
import { useAuthContext } from '../hooks/useAuthContext'
import Alert from '@mui/material/Alert';

const Overview = ({ symbol, price, change, changePercent, currency }) => {
  const { user } = useAuthContext()
  const [buttonText, setButtonText] = useState("+"); 
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const handleClick = async (e) => {
    e.preventDefault()

    if (!user) {
      return
    }



    setButtonText("-")
    const fav = {stock: symbol}

    const response = await fetch('/api/favs', {
      method: 'POST',
      body: JSON.stringify(fav),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })}
  return (
    
    <Card>

      <span className="absolute left-4 top-4 text-neutral-400 text-lg xl:text-xl 2xl:text-2xl">
        {symbol}
        <button onClick={handleClick} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{buttonText}</button>
      </span>
      <div className="w-full h-full flex items-center justify-around">
        <span className="text-2xl xl:text-4xl 2xl:text-5xl flex items-center">
          ${price}
          <span className="text-lg xl:text-xl 2xl:text-2xl text-neutral-400 m-2">
            {currency}
          </span>
        </span>
        <span
          className={`text-lg xl:text-xl 2xl:text-2xl ${
            change > 0 ? "text-lime-500" : "text-red-500"
          }`}
        >
          {change} <span>({changePercent}%)</span>
        </span>
      </div>
    </Card>
  );
};

export default Overview;
