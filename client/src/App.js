import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OtherPage from './OtherPage';
import Fib from './Fib';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Fibonacci Calculator</h1>
            <Link className="App-link" to="/">Home</Link>
            &nbsp;|&nbsp;
            <Link className="App-link" to="/otherpage">Other Page</Link>
          </header>
          <br/>
          <br/>
          <div>
            <Route exact path="/" component={Fib}/>
            <Route path="/otherpage" component={OtherPage}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
