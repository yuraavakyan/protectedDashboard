import React from 'react';
import SignIn from './components/Signin';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/signin' element={<SignIn />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
