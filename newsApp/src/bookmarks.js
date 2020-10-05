import React, { Component } from "react";
import Bookmarkcard from './bookmarkcard';
import { newsData } from './sampledata';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Navbarhead from './navbarhead';
import './index.css';
import { toast, ToastContainer, Zoom } from 'react-toastify';

class Bookmarks extends Component{

  constructor(props){
    super(props);
    this.state = {
      bookmarks: [],
    };
    this.handleRemoveBookmark = this.handleRemoveBookmark.bind(this);
  }
  // Global Array

  componentDidMount(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks') || "[]");
    if(this.state.bookmarks != bookmarks){
      this.setState({
        bookmarks: bookmarks,
      });
    }

    document.getElementById("home").classList.remove('activeButton');
    document.getElementById("world").classList.remove('activeButton');
    document.getElementById("politics").classList.remove('activeButton');
    document.getElementById("business").classList.remove('activeButton');
    document.getElementById("technology").classList.remove('activeButton');
    document.getElementById("sports").classList.remove('activeButton');

    document.getElementById('toggleSwitch').style.display = 'none';


  }

  handleRemoveBookmark(e){

    console.log(e.indval);
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks') || "[]");
    var delTitle = bookmarks[e.indval].title;
    toast("Removing - " + delTitle, {bodyClassName: 'toastCSS'});
    delete bookmarks[e.indval];
    console.log(bookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    if(this.state.bookmarks !== bookmarks){
    this.setState({
      bookmarks: bookmarks,
    });
  }
  }

  render(){

    var bookmarks = this.state.bookmarks;
    console.log(bookmarks);
      var bookmarkElementArr = [];
      for(var i = 0; i<bookmarks.length; i++){
        if(bookmarks[i] != null){
          bookmarkElementArr.push(
          <Col md={4} lg={3} sm={6} xs={12}><Bookmarkcard
                removeBookmark={this.handleRemoveBookmark}
                indval = {i}
                id={bookmarks[i].id}
                source={bookmarks[i].source}
                title={bookmarks[i].title}
                date = {bookmarks[i].date}
                url = {bookmarks[i].url}
                section = {bookmarks[i].section}
                img = {bookmarks[i].img}
              style={{
                width:'100%',
                float:'left',

              }}/></Col>
          );
        }
      }
    console.log(bookmarkElementArr);
    if(bookmarkElementArr != null && bookmarkElementArr.length > 0){
      return(
        <div>
        <Navbarhead searchval = "empty" bookmarksPage = {true}/>
        <h1 style={{marginLeft:'1%'}}> Favourites </h1>
        <Container fluid>
        <Row style={{paddingRight:'0.8%'}}>
        {bookmarkElementArr}
        </Row>
        </Container>
        </div>
      );
  }
  else{
    return(
      <div>
      <Navbarhead searchval = "empty" bookmarksPage = {true}/>

      <Container fluid>
      <Row>
      <h3 style={{marginLeft:'auto', marginRight:'auto', fontSize:'150%', paddingTop:'1%'}}> <b>You have no saved articles </b></h3>
      </Row>
      </Container>
      </div>
    );

  }

  }

}

export default Bookmarks
