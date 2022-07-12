import React from "react";
import { Dashboard, Error, Login } from "./pages";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
   
    <Routes>
      <Route path='/' exact={true} element={<Dashboard />} />
      <Route path='/login' element={<Login/>} />
      <Route path='*' element={<Error />} />
       </Routes>
  </Router>
  )
}

export default App;
