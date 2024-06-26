import React, { useState, useEffect } from "react";
import "./App.css";
import Menu from './components/Menu'
import NewsGrid from './components/NewsGrid'
import Dashboard from "./components/Dashboard";
import StockContext from "./context/StockContext";
import Favs from "./components/Favs";

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Stocks from './pages/Stocks'
import Navbar from './components/Navbar'




function App() {


  const [items, setItems] = useState([])
  const [active, setActive] = useState(1)
  const [category, setCategory] = useState("general")

  
  useEffect (() => {fetch(`https://finnhub.io/api/v1/news?category=${category}&token=${process.env.REACT_APP_API_KEY}`)
.then(res =>
res. json())
.then (data => setItems (data))
}, [category])



  const { user } = useAuthContext()

  const [stockSymbol, setStockSymbol] = useState("FB");
  return (

<div className="App">

<BrowserRouter>
<Navbar></Navbar>
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
            <Route 
              path="/stocks" 
              element={user ? <Stocks /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>
      </BrowserRouter>

      
      {user && <div><Favs></Favs><h1 className="title">See the latest market news!</h1>
      <Menu active ={active} setActive={setActive} setCategory={setCategory}/>
      <NewsGrid items = {items}/>
      </div>}


      {/* {user && <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <Dashboard />
      </StockContext.Provider>}
   */}
      
      
      
    </div>
    

  );
}

export default App;
