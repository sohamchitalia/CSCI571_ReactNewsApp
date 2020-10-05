import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FaRegBookmark } from 'react-icons/fa';
import { faCheckSquare, faCoffee,faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FaBeer } from 'react-icons/fa';
import Rswitch from './rswitch';
import Searchbar from './searchbar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Gradient } from 'react-gradient';
import Sports from './sports';
import './index.css';
// Routing
import { BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MediaQuery from 'react-responsive';

library.add(fab, faCheckSquare, faCoffee, faBookmark)

function Bookmark(){
  return <FontAwesomeIcon icon={faBookmark} color="white" size="2em" />
}

function RegBookmark(){

  return <FaRegBookmark color="white" size="2em"/>

}

class Navbarhead2 extends Component {

  constructor(props){
    super(props);
    // this.state = {
    //   displaySwitch: this.props.displaySwitch
    // };

  }
  render() {

    // if(this.state.displaySwitch == 'on')
    //   var switchElem = <Rswitch />
    // else {
    //   var switchElem = '';
    // }

    const linkStyle={
      margin: '5px',
      padding:'5px',
      textDecoration:'none',

    }


    return (
      <div style={{backgroundImage: 'linear-gradient(to right, #142141 , #395DAF)'}}>
      <Navbar variant = "dark" expand="lg">
      <MediaQuery minDeviceWidth = {1000}>
      <div style={{width: '17%'}}>
      <Searchbar style={{display:'block'}}/>
      </div>
      </MediaQuery>

      <MediaQuery maxDeviceWidth = {1000}>
      <div style={{width: '80%'}}>
      <Searchbar style={{display:'block'}}/>
      </div>
      </MediaQuery>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="mr-auto">

              <NavLink
                to="/"
                style={linkStyle}
                activeClassName="btnclass"
                className="btnclass">
              Home </NavLink>
              <NavLink
                to="/world"
                style={linkStyle}
                activeClassName="btnclass"
                className="btnclass">
              World </NavLink>
              <NavLink
                to="/politics"
                style={linkStyle}
                activeClassName="btnclass"
                className="btnclass">
              Politics </NavLink>
              <NavLink
                to="/business"
                style={linkStyle}
                activeClassName="btnclass"
                className="btnclass">
              Business </NavLink>
              <NavLink
                to="/technology"
                style={linkStyle}
                activeClassName="btnclass"
                className="btnclass">
              Technology </NavLink>
              <NavLink
                to="/sports"
                style={linkStyle}
                activeClassName="btnclass"
                className="btnclass">
              Sports </NavLink>

            </Nav>
              <NavLink
              to="/bookmarks">
                <RegBookmark />
              </NavLink>

          </Navbar.Collapse>
      </Navbar>
      </div>

    )
  }
}

export default Navbarhead2
