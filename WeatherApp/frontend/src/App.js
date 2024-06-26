import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  const { user } = useAuthContext()
  return (

    <div className="App">
    <BrowserRouter>

      <Navbar />

      <AppContainer>
      <div className="pages">
        <Routes>
          <Route 
            path="/" 
            element={user ? <Home /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={!user ?   <AccountBox /> : <Navigate to="/" />} 
          />
          <Route 
            path="/signup" 
            element={!user ?   <AccountBox /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
      </AppContainer>
    </BrowserRouter>
  </div>

  );
}

export default App;
