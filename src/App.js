import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './views/Home.js'; 
import Input from './views/Input.js'; 
import './App.css';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
            <a className="navbar-brand" href="index.html">Random Winner</a>
            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-default" aria-controls="navbar-default" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
        </div>
      </nav>
      <div className="container" style={{ 'padding': '15px', textAlign: 'center' }}> 
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/input" element={<Input/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
