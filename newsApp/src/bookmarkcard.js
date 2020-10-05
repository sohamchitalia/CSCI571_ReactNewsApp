import React, { Component } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { NavLink } from 'react-router-dom';
import './index.css';
import { FaRegBookmark, FaBookmark, FaChevronDown, FaChevronUp, FaShareAlt, FaTrash } from 'react-icons/fa';
import Sharemodal from './sharemodal';
import {
  EmailShareButton,
  FacebookShareButton,
  MailruShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon
} from "react-share";


class Bookmarkcard extends Component{
  constructor(props){
    super(props);
    this.state={
      res: [],
      source: this.props.source,
      id: this.props.id,
      title: this.props.title,
      date: this.props.date,
      url: this.props.url,
      section: this.props.section,
      img: this.props.img
    }
    this.cutDesc = this.cutDesc.bind(this);
    this.bookmarkWrapperClick = this.bookmarkWrapperClick.bind(this);
    this.modalClick = this.modalClick.bind(this);
  }

  bookmarkWrapperClick(e){
    e.preventDefault();
  }

  cutDesc(sent){
      var content = sent.trim();
      // console.log(content);
    	var newcontent = content.split(' ');
    	// content = content.split(' ');
    	var newstr = "";
    	var chars = 0;
    	for(var i = 0; i<newcontent.length; i++){
    		if((chars + newcontent[i].length <= 70)){
    			chars = chars + newcontent[i].length + 1;
    			newstr = newstr + newcontent[i] + " ";
    		}
    		else{
    			break;
    		}
    	}
    	if(content.length > newstr.length)
    		return newstr.substring(0,newstr.length-1) + "...";
    	else
    		return newstr.substring(0,newstr.length-1)
    }
    modalClick(e){
      e.preventDefault();
    }

  render(){

    var title = this.props.title;
    var url = this.props.url;
    var date = this.props.date;
    var id = this.props.id;
    var section = this.props.section;
    var source = this.props.source;
    var receivedId = this.props.id;
    var img = this.props.img;
    var indval = this.props.indval;

    console.log(this.state);
    console.log(this.props);
    console.log(title);
    var len = receivedId.length;
    const mainId = receivedId;

    console.log(this.props);

    const cardimg = {
      padding: '1.5%',
      border: '2px solid lightgrey',
      borderRadius: '4px',
      margin: '0.1%'
    }
    const cardtitle = {
      fontSize: '105%',
      fontWeight:'550'
    }
    const cardStyle={
      boxShadow: "5px 5px 8px 5px #A5A5A5",
      marginLeft: '1%',
      marginRight: '1%',
      marginTop: '10px',
      marginBottom: '10px',
      width:'100%',
      float:'left',

    }
    if(source == 'nytimes'){
      var post = '/post/'
    }
    else{
      var post = '/post'
    }
    const badgeColor = {
      sport:"warning",
      sports:"warning",
      business:"info",
      politics: "success",
      world: "primary",
      technology: "success",
    }

    var bcolor = badgeColor[this.props.section.toLowerCase()];
    if(bcolor == null)
      var colorSection = 'default';
    else {
      var colorSection = this.props.section.toLowerCase();
    }
    console.log(colorSection);


    return(
      <NavLink style={{textDecoration:'none', color:'black'}}to={`${post}${id}`}>
      <Card style={cardStyle}>
        <Container fluid>
          <Card.Body>
            <Card.Title style={cardtitle}>
              <i> {title} </i>
              <span onClick={this.modalClick}>
              <Sharemodal style={{textDecoration: 'none'}} heading={title} url = {url} title = {title} showSource = 'true' source = {{source}}/>
              </span>
              <span onClick={this.bookmarkWrapperClick}>
              <FaTrash size="0.8em" onClick={() => this.props.removeBookmark({indval})}/>
              </span>

            </Card.Title>
            <Card.Img variant="top" style={cardimg} src={img} />
            <Row style={{height:'20%'}}>
              <Col md={6} sm={6} xs={6}>
                <p style={{float:'left', fontSize:'90%'}}> <i>{date}</i></p>
              </Col>
              <Col md={3} sm={3} xs={3} style={{float:'right'}}>
                <p style={{float:'right', fontSize:'90%'}}><Badge className={colorSection}> {section.toUpperCase()} </Badge></p>
              </Col>
              <Col md={3} sm={3} xs={3}>
                <p style={{float:'right',fontSize:'90%'}}><Badge className={source.toLowerCase()}> {source.toUpperCase()} </Badge></p>
              </Col>
            </Row>
          </Card.Body>
        </Container>
      </Card>
      </NavLink>
    );
  }

}

export default Bookmarkcard
