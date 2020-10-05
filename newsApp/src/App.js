import React, { Component } from 'react'
import Homegrid from './homegrid';
import Navbarhead from './navbarhead';
import World from './world';
import Politics from './politics';
import Business from './business';
import Technology from './technology';
import Sports from './sports';
import Bookmarks from './bookmarks';
import Routebigcard from './routebigcard';
import Searchresults from './searchresults';
import Routesearch from './routesearch';

import { toast, ToastContainer, Zoom } from 'react-toastify';
import { BrowserRouter, Route, Switch, Link, withRouter } from 'react-router-dom';

toast.configure({
  transition: Zoom,
  autoclose: 1500,
  draggable: true,
  position: "top-center",
  hideProgressBar: true,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
});

class App extends Component {

  constructor(props){
    localStorage.setItem('displaySwitch', 'on');
    super(props);
    this.state = {
      displaySwitch: localStorage.getItem('displaySwitch'),
    }

  }
  componentDidUpdate(prevState, prevProps){
    if(prevState.displaySwitch != this.state.displaySwitch && this.state.displaySwitch != localStorage.getItem('displaySwitch')){
      this.setState({
        displaySwitch: localStorage.getItem('displaySwitch'),
      })
    }

  }



  render() {

    return (
      <div className="App">

        <Route path="/" exact component={Homegrid} />
        <Route path="/world" exact component={World} />
        <Route path="/politics" exact component={Politics} />
        <Route path="/business" exact component={Business} />
        <Route path="/technology" exact component={Technology} />
        <Route path="/sports" exact component={Sports} />
        <Route path="/bookmarks" exact component={Bookmarks} />
        <Route path="/post/:id" component={Routebigcard} />
        <Route path="/search" component={Routesearch} />
      </div>
    )
  }
}

export default App
