import React, { Component } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import './index.css';
import { FaRegBookmark, FaBookmark, FaChevronDown, FaChevronUp, FaShareAlt } from 'react-icons/fa';
import Sharemodal from './sharemodal';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import {
  EmailShareButton,
  FacebookShareButton,
  MailruShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon
} from "react-share";


class Homecard extends Component{
  constructor(props){
    super(props);
    this.modalClick = this.modalClick.bind(this);
  }

  modalClick(e){
    console.log("Modal");
    e.preventDefault();
  }
  render(){
    console.log(this.props.id);

    const cardimg = {
      padding: '5px',
      border: '2px solid lightgrey',
      borderRadius: '4px',
      marginTop: '2%',
      marginBottom:'3%',
      // height: '230px',
      objectFit: 'cover',
      width: '100%',
    }
    const cardtitle = {
      fontSize: '140%',
      color:'black',
      textDecoration: 'none'
    }
    const cardStyle={
      textDecoration: 'none',
      boxShadow: "5px 5px 8px 5px #DADADA",
      marginLeft: '1.2%',
      marginRight: '1.2%',
      marginTop: '20px',
      marginBottom: '20px',
      color: 'black'
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
    var bcolor = badgeColor[this.props.section.toLowerCase()];
    if(bcolor == null)
      var colorSection = 'default';
    else {
      var colorSection = this.props.section.toLowerCase();
    }
    console.log(colorSection);

    var desc = this.props.description;
    if(desc.length > 110){
      var mobdesc = desc.slice(0,110) + '...';
    }
    else{
      var mobdesc = desc;
    }

    if(desc.length > 210){
      var ipaddesc = desc.slice(0,210) + '...';
    }
    else{
      var ipaddesc = desc;
    }




    return (
      <NavLink style={{textDecoration:'none'}}to={`/post/${this.props.id}`}>
        <div style={{margin:'1%'}}>
          <Card style={cardStyle}>
            <Container fluid>
              <Row>
                <Col xs={12} sm={12} md={4}>
                   <Card.Img variant="top" style={cardimg} src={this.props.image} />
                </Col>
                <Col xs={12} sm={12} md={8}>

                    <Card.Body>
                      <Card.Title style={cardtitle}> <i> {this.props.title} </i><span><span onClick={this.modalClick} > <Sharemodal style={{textDecoration: 'none'}} heading={this.props.title} url = {this.props.url} showSource = 'false' /></span></span> </Card.Title>
                      <Card.Text style={{fontSize:'100%'}}>
                      <MediaQuery minDeviceWidth = {1192}>
                        {this.props.description}
                      </MediaQuery>
                      <MediaQuery minDeviceWidth = {720} maxDeviceWidth = {1024}>
                        {ipaddesc}
                      </MediaQuery>
                      <MediaQuery maxDeviceWidth = {719}>
                        {mobdesc}
                      </MediaQuery>
                      </Card.Text>

                      <Row>
                    <Col lg={6} md={6} xs={6}>
                      <p style={{float:'left', fontWeight:'520', fontSize:'100%'}}> <i> {this.props.date} </i></p>
                    </Col>
                    <Col lg={6} md={6} xs={6}>
                      <p style={{float:'right', fontSize:'110%'}}><Badge className={colorSection}> {this.props.section} </Badge></p>
                    </Col>
                  </Row>
                  </Card.Body>
                </Col>
              </Row>
            </Container>
          </Card>
        </div>
      </NavLink>
    );
  }

}
export default Homecard
