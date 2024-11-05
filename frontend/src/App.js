import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import UserDetails from './components/UserDetails';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-details" element={<UserDetails />} />
          {/* Other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
