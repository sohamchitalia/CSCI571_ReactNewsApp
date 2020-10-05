import React, { Component, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import {FaShareAlt} from 'react-icons/fa';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import MediaQuery from 'react-responsive';
import './sampledata';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon
} from "react-share";


function Sharemodal(props) {
  const [show, setShow] = useState(false);

  const handleClose = (e) => {
    setShow(false);
  }

  const handleShow = (e) => {
    setShow(true);
  }

  const bodyStyle = {
    textAlign: 'center',
    padding: '20px'
  }
  var hashtags=['CSCI_571_NewsApp'];

  if(props.showSource == 'true'){
    if(props.source.source == 'guardian'){
      var sourceName = 'GUARDIAN'
    }
    else{
      var sourceName = 'NEW YORK TIMES'
    }
  }
  else{
    var sourceName = null;
  }


  return (
    <>

      <FaShareAlt size="0.75em" onClick={handleShow} style={{paddingRight:'0px'}}/>
      <div style={{display:'inline-block', overflowY:'scroll'}}>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{fontSize:'135%'}}> <h3>{sourceName}</h3>{props.heading}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={bodyStyle}>
          <h4> Share via </h4>
          <Row>

            <Col lg={4} md={4} sm={4} xs={4} style={{float:'left', marginLeft:'0%'}}>

                <FacebookShareButton url={props.url} hashtag='#CSCI_571_NewsApp'>
                  <FacebookIcon size={60} round={true} />
                </FacebookShareButton>

            </Col>
            <Col lg={4} md={4} sm={4} xs={4} >

              <TwitterShareButton url={props.url} hashtags={hashtags}>
                <TwitterIcon size={60} round={true} />
              </TwitterShareButton>

              </Col>
              <Col lg={4} md={4} sm={4} xs={4} style={{float:'right'}}>

                <EmailShareButton  url={props.url} subject="#CSCI_571_NewsApp" seperator = {' '}>
                  <EmailIcon size={60} round={true} />
                </EmailShareButton>

              </Col>
            </Row>
          </Modal.Body>
        </Modal>
        </div>
    </>
  );


}

export default Sharemodal
