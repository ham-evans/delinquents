import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About'
import Images from './components/Images.js'
import Roadmap from './components/Roadmap'
import Team from './components/Team'
import Footer from './components/Footer'
import { BrowserRouter as Router, Switch } from "react-router-dom";


class App extends Component {
  
  render() {
    return (
      <>
        <Router>
          <Switch />
          <Navbar />
          <Home />
          
          <About />
          <Images />
          <Roadmap />
          <Team />
          <Footer />
        </Router> 
      </>
    );
  }
}

export default App;
