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
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
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
import MediaQuery from 'react-responsive';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

// Routing
import { BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


library.add(fab, faCheckSquare, faCoffee, faBookmark)

function Bookmark(){
  return   <OverlayTrigger
      key = "Bookmark"
      placement="bottom"
      overlay={
        <Tooltip>
          Bookmark
        </Tooltip>
      }>
      <span>
      <MediaQuery minDeviceWidth = {992}>
        <FaBookmark color="white" size="1.4em"/>
      </MediaQuery>

      <MediaQuery maxDeviceWidth = {991}>
        <FaBookmark color="white" size="1.3em" style={{marginLeft: '1.3%'}}/>
      </MediaQuery>
      </span>
      </OverlayTrigger>
}

function RegBookmark(){

  return   <OverlayTrigger
      key = "Bookmark"
      placement="bottom"
      overlay={
        <Tooltip>
          Bookmark
        </Tooltip>
      }>
      <span>
      <MediaQuery minDeviceWidth = {992}>
        <FaRegBookmark color="white" size="1.4em"/>
      </MediaQuery>

      <MediaQuery maxDeviceWidth = {991}>
        <FaRegBookmark color="white" size="1.3em" style={{marginLeft: '1.3%'}}/>
      </MediaQuery>
      </span>
      </OverlayTrigger>

}


class Navbarhead extends Component {

  constructor(props){
    super(props);

  }
  render() {

    if(this.props.bookmarksPage){
      var bookmarkIcon = <Bookmark />
    }
    else{
      var bookmarkIcon = <RegBookmark />
    }

    const linkStyle={
      margin:'5px',
      textDecoration:'none',
      fontSize: '95%',

    }

    if(this.props.switchDisplay == 'off'){
    return (

      <div style={{backgroundImage: 'linear-gradient(to right, #142141 , #395DAF)'}}>

      <Navbar bg="primary" variant = "dark" expand="lg">

      <div style={{marginBottom:'0px'}} className="asyncBox">
      <Searchbar searchval = {this.props.searchval} style={{display:'block'}}/>
      </div>


        <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="mr-auto">

              <NavLink
                to="/"
                style={linkStyle}
                id = "home"
                activeClassName="btnclass"
                className="btnclass">
              <span ref="home">Home</span> </NavLink>
              <NavLink
                to="/world"
                style={linkStyle}
                activeClassName="btnclass"
                id = "world"
                className="btnclass">
              <span ref={'world'}>World</span> </NavLink>
              <NavLink
                to="/politics"
                style={linkStyle}
                activeClassName="btnclass"
                id = "politics"
                className="btnclass">
              <span ref="politics">Politics</span> </NavLink>
              <NavLink
                to="/business"
                style={linkStyle}
                id = "business"
                activeClassName="btnclass"
                className="btnclass">
              <span ref="business">Business</span> </NavLink>
              <NavLink
                to="/technology"
                style={linkStyle}
                id = "technology"
                activeClassName="btnclass"
                className="btnclass">
              <span ref="technology">Technology</span> </NavLink>
              <NavLink
                to="/sports"
                style={linkStyle}
                id = "sports"
                activeClassName="btnclass"
                className="btnclass">
              <span ref="sports">Sports</span> </NavLink>

            </Nav>
              <NavLink style={{marginRight:'20px', paddingRight:'15px, marginBottom:'-0.5%''}}
              to="/bookmarks">
                {bookmarkIcon}
              </NavLink>

          </Navbar.Collapse>
      </Navbar>

      </div>
    )
  }
  else{
    return(
      <div style={{backgroundImage: 'linear-gradient(to right, #142141 , #395DAF)'}}>

      <Navbar variant = "dark" expand="lg">

      <div style={{marginBottom:'0px'}} className="asyncBox">
        <Searchbar searchval = {this.props.searchval} style={{display:'block', width:'100%'}}/>
      </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="mr-auto">

              <NavLink
                to="/"
                style={linkStyle}
                activeClassName="btnclass"
                className="btnclass">
              <span ref="home" id = "home">Home</span> </NavLink>
              <NavLink
                to="/world"
                style={linkStyle}
                activeClassName="btnclass"

                className="btnclass">
              <span ref={'world'} id = "world">World</span> </NavLink>
              <NavLink
                to="/politics"
                style={linkStyle}
                activeClassName="btnclass"

                className="btnclass">
              <span ref="politics" id = "politics">Politics</span> </NavLink>
              <NavLink
                to="/business"
                style={linkStyle}

                activeClassName="btnclass"
                className="btnclass">
              <span ref="business" id = "business">Business</span> </NavLink>
              <NavLink
                to="/technology"
                style={linkStyle}

                activeClassName="btnclass"
                className="btnclass">
              <span ref="technology" id = "technology">Technology</span> </NavLink>
              <NavLink
                to="/sports"
                style={linkStyle}

                activeClassName="btnclass"
                className="btnclass">
              <span ref="sports" id = "sports">Sports</span> </NavLink>

            </Nav>

              <NavLink style={{marginRight:'15px', paddingRight:'15px', marginBottom:'-0.5%'}}
              to="/bookmarks">
                {bookmarkIcon}
              </NavLink>
              <MediaQuery minDeviceWidth={992}>
              <span id= 'toggleSwitch' style={{marginTop: '10px', marginBottom:'-0.5%'}}> <Rswitch /> </span>
              </MediaQuery>

              <MediaQuery maxDeviceWidth={991}>
              <span id= 'toggleSwitch' style={{marginLeft:'1.2%'}}> <Rswitch /> </span>
              </MediaQuery>

          </Navbar.Collapse>
      </Navbar>

      </div>
    );
  }
  }
}

export default Navbarhead
