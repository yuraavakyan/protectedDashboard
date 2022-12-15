import React from 'react';
import SignIn from './components/Signin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard';
import SignUp from './components/Signup';
import Navbar from './components/common/Navbar';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
