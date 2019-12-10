import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateConsulta from "./components/create-consulta.component";
import EditConsulta from "./components/edit-consulta.component";
import ConsultaList from "./components/consulta-list.component";
import Home from "./components/Home";

import logo from "./static/webmedlogo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <img src={logo} width="27" height="27" alt="CodingTheSmartWay.com" />
          
            <Link to="/" className="navbar-brand">Web Med</Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Consultas</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Marcar Consulta</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/" exact component={Home} />
          <Route path="/list" component={ConsultaList} />
          <Route path="/edit/:id" component={EditConsulta} />
          <Route path="/create" component={CreateConsulta} />
        </div>
      </Router>
    );
  }
}

export default App;
