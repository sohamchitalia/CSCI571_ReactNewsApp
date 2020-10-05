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


class Searchcard extends Component{
  constructor(props){
    super(props);
    this.state={
      res: []
    }
    // this.cutDesc = this.cutDesc.bind(this);
  }

  componentDidMount(){
    var receivedId = this.props.id;
    console.log(receivedId);
    // var id = receivedId.slice(7);
    var len = receivedId.length;
    const mainId = receivedId;
    this.setState({
      postId: mainId,
      source: this.props.source,
    })

  }

  modalClick(e){
    console.log("Modal");
    e.preventDefault();
  }

  render(){


    var res = this.state.res;
    console.log(res);
    var title = this.props.title;
    // var desc = this.props.description;
    var img = this.props.image;
    var dt = this.props.date;


    var section = this.props.section ? this.props.section : null;
    var bigsect = this.props.section ? section.toUpperCase() : null;
    var source = this.props.source;

    if(title.length > 55){
      var displaytitle = title.slice(0,55) + "...";
    }
    else{
      var displaytitle = title;
    }


    const cardimg = {
      padding: '5px',
      border: '2px solid lightgrey',
      borderRadius: '4px',
      margin: '1%',
      objectFit: 'cover',
      maxHeight: '270px',
    }
    const cardtitle = {
      fontSize: '115%',
      fontWeight:'650'
    }
    const cardStyle={
      boxShadow: "5px 5px 8px 5px #A5A5A5",
      marginLeft: '1%',
      marginRight: '1%',
      marginTop: '10px',
      marginBottom: '10px',
      width:'100%',

      overflow: 'hidden'

    }

    const badgeColor = {
      sport:"warning",
      sports:"warning",
      business:"info",
      politics: "success",
      world: "primary",
      technology: "success",
    }

    //
    if(section != null){
      var bcolor = badgeColor[section.toLowerCase()];
      if(bcolor == null)
        var colorSection = 'default';
      else {
        var colorSection = section.toLowerCase();
      }
      console.log(colorSection);
      var badgeRender =
        <span style={{float:'right'}}>
        <Badge className={colorSection.toLowerCase()}> {bigsect} </Badge>
        </span>
    }
    else{
      var badgeRender = null
    }

    return(
      <NavLink style={{textDecoration:'none', color:'black'}}to={`/post/${this.props.id}`}>
      <Card style={cardStyle}>
        <Container fluid>
          <Card.Body>
            <Card.Title style={cardtitle}>
              <i>{displaytitle}</i><span> <span onClick={this.modalClick} > <Sharemodal style={{textDecoration: 'none', width:'100%'}} heading={title} url = {this.props.url} title = {title} description = {this.props.description}/></span></span>
            </Card.Title>
            <Card.Img variant="top" style={cardimg} src={img} />
            <Row style={{height:'20%'}}>
              <Col md={6} sm={6} xs={6} style={{fontSize:'90%'}}>
              <i> {dt} </i>
              </Col>
              <Col md={6} sm={6} xs={6} style={{float:'right', fontSize:'95%'}}>
                {badgeRender}
              </Col>
            </Row>
          </Card.Body>
        </Container>
      </Card>
      </NavLink>


    );
  }

}

export default Searchcard
