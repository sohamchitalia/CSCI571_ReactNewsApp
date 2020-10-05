import React, { Component } from "react";
import Bookmarkcard from './bookmarkcard';
import { newsData } from './sampledata';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';



class Bookmarks extends Component{

  constructor(props){
    super(props);
    // const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || "[]");
    this.state = {
      bookmarks: [],
      bookmarkElems: [],
    };
    this.handleRemoveBookmark = this.handleRemoveBookmark.bind(this);

  }
  bookmarkElementArr = [];

  componentDidMount(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks') || "[]");
    this.bookmarkElementArr = bookmarks.map((element) => (
      <Bookmarkcard
        removeBookmark={this.handleRemoveBookmark}
        id={element.id}
        source={element.source}
      style={{
        width:'250px',
        float:'left',

      }}/>
    ));
    if(this.state.bookmarks != bookmarks && this.state.bookmarkElems != this.bookmarkElementArr){
      this.setState({
        bookmarks: bookmarks,
        bookmarkElems: bookmarkElementArr,
      })
    }

  }


  handleRemoveBookmark(e){

    console.log(e.id);
    var deleteId = e.id;
    if(deleteId.includes('nytimes')){
      deleteId = deleteId.slice(1);
    }
    console.log(deleteId);
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || "[]");
    const newbk = bookmarks.filter(bookmark =>
        bookmark.id != deleteId
      );
    console.log(newbk);
    localStorage.setItem('bookmarks', JSON.stringify(newbk));

    if(this.state.bookmarks !== newbk)
    this.setState({
      bookmarks: newbk
    });

  }

  render(){

    var dataarr = JSON.parse(localStorage.getItem('bookmarks') || "[]");
    const elements = dataarr.map((element) => (
      <Bookmarkcard
        removeBookmark={this.handleRemoveBookmark}
        id={element.id}
        source={element.source}
      style={{
        width:'250px',
        float:'left',

      }}/>
    ));

    console.log(elements);
    return(
      <div>
      <h1> Favourites </h1>
      {elements}
      </div>
    );
  }

}

export default Bookmarks
