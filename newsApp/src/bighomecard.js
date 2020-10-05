import React, { Component } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { FaRegBookmark, FaBookmark, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Accordion from 'react-bootstrap/Accordion';
import './index.css';
import MediaQuery from 'react-responsive';
import ReactTooltip from 'react-tooltip';
import Spinner from 'react-bootstrap/Spinner';
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';



import Commentcomp from './commentcomp'
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon
} from "react-share";


class Bighomecard extends Component{

  constructor(props){

    super(props);
    this.state = {
      chev: 'down',
      trunc: true,
      bookmark: false,
      chevDisplay: 'on',
    }
    this.showAll = this.showAll.bind(this);
    this.showLess = this.showLess.bind(this);
    this.doBookmark = this.doBookmark.bind(this);
    this.undoBookmark = this.undoBookmark.bind(this);
    this.findSent = this.findSent.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
  }

  componentDidMount(){
    Events.scrollEvent.register('begin', function(to, element) {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function(to, element) {
      console.log("end", arguments);
    });

    scrollSpy.update();
  }

  scrollTo(){
    var scroll = Scroll.animateScroll;
    var scroller = Scroll.scroller;
    scroller.scrollTo('scrollHere',{
      duration: 500,
      smooth: true,
      offset: -40,
      isDynamic: 'true'
    });
  }

  showAll() {
    console.log('The link was clicked.');
    this.setState({
      chev: 'up',
      trunc: false,
    });

    this.scrollTo();

  }
  showLess() {
    console.log('The Less was clicked.');
    this.setState({
      chev: 'down',
      trunc: true,
    });

    var scroll = Scroll.animateScroll;
    scroll.scrollToTop({
      duration:500,
      smooth: true
    });
  }

  doBookmark(){
    this.setState({
      bookmark: true
    });
    var id = this.props.id;
    var source = this.props.source;
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || "[]");
    bookmarks.push({
      id: id,
      source: source,
      url: this.state.url,
      title: this.state.title,
      img: this.state.img,
      section: this.state.section,
      date: this.state.date
    });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    toast("Saving - " + this.state.title, {bodyClassName: 'toastCSS'});
    console.log(bookmarks);
  }

  undoBookmark(){
    this.setState({
      bookmark: false
    });
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || "[]");
    const newbk = bookmarks.filter(bookmark =>
      bookmark != null && bookmark.id != this.props.id
    );
    localStorage.setItem('bookmarks', JSON.stringify(newbk));
    toast("Removing - " + this.state.title, {bodyClassName: 'toastCSS'});

  }
  findSent(sent){
    var content = sent.trim();
    var newcontent = content.split('. ');
    var shortSent = ''
    for(var i = 0; i < 4; i++){
      shortSent = shortSent + newcontent[i] + '. ' ;
    }
    return shortSent.slice(0,shortSent.length-1);
  }

  render(){

    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || "[]");
    if(bookmarks.length > 0){
    for(var i = 0; i < bookmarks.length; i++){
      if(bookmarks[i] != null && bookmarks[i]['id'] === this.props.id){
        if(this.state.bookmark != true)
          this.setState({bookmark: true});
      }
    }
  }
    console.log(this.props.id);
    if(this.props.source === 'guardian'){
      var res = this.props.data;
      console.log(res);
      if( res != null){
        var title = res['webTitle'];
        if(this.state.title != title){
          this.setState({
            title: title
          });
        }
        var url = res['webUrl'];
        if(res['blocks'] != null && res['blocks']['body'] != null && res['blocks']['body'][0]['bodyTextSummary'] != null){
          var description = res['blocks']['body'][0]['bodyTextSummary'];
          if(this.findSent(res['blocks']['body'][0]['bodyTextSummary']).length < description.length){
            var startdesc = this.findSent(res['blocks']['body'][0]['bodyTextSummary']);
            var enddesc = res['blocks']['body'][0]['bodyTextSummary'].slice(startdesc.length);
          }
          else{
            var startdesc = res['blocks']['body'][0]['bodyTextSummary'];
            var enddesc = null;
            if(this.state.chevDisplay != 'off'){
              this.setState({
                chevDisplay: 'off'
              });
            }
          }
          var smalldesc = res['blocks']['body'][0]['bodyTextSummary'];
          if(res.blocks.main != null && res.blocks.main.elements != null && res.blocks.main.elements[0].assets != null){
            var assetlength = res.blocks.main.elements[0].assets.length
            if(assetlength > 0)
              var img = res.blocks.main.elements[0].assets[assetlength-1].file;
            else {
              var img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
            }
          }
          else{
            var img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
          }
        }
        if( res.webPublicationDate != null){
          var dt = res.webPublicationDate.slice(0,10);
        }
        if(res.sectionId != null){
          var section = res.sectionId;
          var bigsect = section.toUpperCase();
        }
      }
      if(this.state.url != url && this.state.img != img && this.state.dt != dt && this.state.section != section){
        this.setState({
          url: url,
          img: img,
          section: section,
          date: dt
        });
      }
    }

    if(this.props.source === 'nytimes'){
      console.log(this.props.data);
      var res = this.props.data;
      console.log(res);
      if( res != null){
        var title = res.headline.main;

        var url = res.web_url;
        if(this.state.url != url && this.state.title != title){
          this.setState({
            url: url,
            title: title
          });
        }
        if(res.abstract != null){
          var description = res.abstract;
          if(this.findSent(res.abstract).length < description.length){
            var startdesc = this.findSent(res.abstract);
            var enddesc = res.abstract.slice(startdesc.length);
          }
          else{
            var startdesc = res.abstract;
            var enddesc = null;
          }

          var smalldesc = res.abstract;
          if(res.multimedia != null){
            var multimedialength = res.multimedia.length
            if(multimedialength > 0){
              var imgset = false;
              for(var i=0; i<multimedialength; i++){
                if(res.multimedia[i].width > 2000){
                  var img = 'https://www.nytimes.com/'+res.multimedia[i].url;
                  console.log(img);
                  imgset = true;
                  break;
                }
              }
              if(imgset != true)
                var img = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
            }
            else {
              var img = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
            }
          }
          else{
            var img = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
          }
          if(this.state.img != img){
            this.setState({
              img: img
            })
          }
          console.log(img)
        }
        if( res.pub_date != null){
          var dt = res.pub_date.slice(0,10);
        }
        if(res.section_name != null){
          var section = res.section_name;
          if(this.state.section != section && this.state.date != dt){
            this.setState({
              section: section.toLowerCase(),
              date: dt
            });
          }
          var bigsect = section.toUpperCase();
        }
      }

    }

    let Link = Scroll.Link;
    let Element = Scroll.Element;
    let Events = Scroll.Events;
    let scroll = Scroll.animateScroll;
    let scrollSpy = Scroll.scrollSpy;
    let chevIcon;
    let ellipse;
    if(this.state.chevDisplay == 'on'){

      if(this.state.chev == 'down'){

        chevIcon =
            <span>
              <MediaQuery minDeviceWidth = {992}>

                <FaChevronDown to='enddesc' size="1em" style={{float:'right', display:'inline-block', paddingRight:'0px', marginRight:'0px',color:'black', backgroundColor:'white', border:'none'}} onClick={this.showAll}/>
              </MediaQuery>
              <MediaQuery maxDeviceWidth = {991}>
                <FaChevronDown size="0.6em" style={{float:'right',color:'black', display:'inline-block', paddingRight:'0px', marginRight:'0px', backgroundColor:'white', border:'none'}} onClick={this.showAll}/>
              </MediaQuery>
            </span>
          // </Link>

        ellipse = <span>...</span>
      }
      else{
        chevIcon = <span><MediaQuery minDeviceWidth = {992}><FaChevronUp size="1em" style={{float:'right',color:'black', paddingRight:'0px', marginRight:'0px', backgroundColor:'white', display:'inline-block'}} onClick={this.showLess}/></MediaQuery><MediaQuery maxDeviceWidth = {991}><FaChevronUp size="1em" style={{float:'right',color:'black', paddingRight:'0px', marginRight:'0px', backgroundColor:'white'}} onClick={this.showLess}/></MediaQuery></span>
        ellipse = <span></span>
      }
    }
    else{
      chevIcon = <p> </p>
      ellipse = <span></span>
    }


// Styles
console.log(this.state);
    const cardtitle = {
      // paddingLeft: '8px',
      margin:'10px',
    }
    const bigCardTop = {
      marginLeft:'0px',
      paddingLeft:'0px',
      marginRight:'5px',
      paddingRight:'5px',
      position:'relative'

    }
    const cardimg = {
      padding: '1px',
      border: 'none',
      borderRadius: '4px',
      marginBottom: '15px',
      marginTop: '5px',
      objectFit: 'cover'
    }
    const cardStyle={
      boxShadow: "5px 5px 8px 5px #A5A5A5",
      marginLeft: '20px',
      marginRight: '20px',
      marginTop: '20px',
      marginBottom: '20px'
    }
    const cardtext={
      marginLeft:'1px',
      marginRight:'5px',
      paddingLeft:'0px',
      paddingRight:'5px',
      textAlign: 'justify',
      fontSize: '100%'
    }
/// end styles


    let cardText;

    if(this.props.source === 'guardian'){
      if(this.state.chevDisplay == 'on' ){

    cardText = (<div>
      <span style={cardtext} style={{display:'inline'}}>
      <Element name='startdesc'> {startdesc}{ellipse}</Element>
      <Element name="scrollHere"> </Element>
      </span>
    <Accordion.Collapse eventKey="0">
    <Element name='enddesc'> {enddesc} </Element>
    </Accordion.Collapse>

    <Accordion.Toggle eventKey="0" style={{float:'right', marginRight:'0px', marginLeft:'95%',padding:'0px', border:'0px'}}>
      {chevIcon}
    </Accordion.Toggle>
    </div>);
      }
      else{
        cardText = (<Card.Text style={cardtext}>
          {startdesc}
        </Card.Text>);
      }
    }

    else{
      cardText = (<Card.Text style={cardtext}>
        {startdesc}
      </Card.Text>);
    }

    let bookmarkIcon;
    if(this.state.bookmark == false){
      bookmarkIcon =
      <span>
        <MediaQuery minDeviceWidth = {992}>
        <OverlayTrigger
          key = "Bookmark"
          placement="top"
          overlay={
            <Tooltip>
              Bookmark
            </Tooltip>
          }>
          <FaRegBookmark size="1.7em" style={{float:'right',color:'red'}} onClick={this.doBookmark}/>
          </OverlayTrigger>
        </MediaQuery>
        <MediaQuery maxDeviceWidth = {991}>
        <OverlayTrigger
          key = "Bookmark"
          placement="top"
          overlay={
            <Tooltip>
              Bookmark
            </Tooltip>
          }>
          <FaRegBookmark size="1.4em" style={{float:'right',color:'red'}} onClick={this.doBookmark}/>
          </OverlayTrigger>
        </MediaQuery>
      </span>
    }
    else{
      bookmarkIcon =
      <span>
        <MediaQuery minDeviceWidth = {992}>
        <OverlayTrigger
          key = "BookmarkFull"
          placement="top"
          overlay={
            <Tooltip>
              Bookmark
            </Tooltip>
          }>
          <FaBookmark size="1.7em" style={{float:'right',color:'red'}} onClick={this.undoBookmark}/>
          </OverlayTrigger>
        </MediaQuery>
        <MediaQuery maxDeviceWidth = {991}>
        <OverlayTrigger
          key = "BookmarkFull"
          placement="top"
          overlay={
            <Tooltip>
              Bookmark
            </Tooltip>
          }>
          <FaBookmark size="1.4em" style={{float:'right',color:'red'}} onClick={this.undoBookmark}/>
          </OverlayTrigger>
        </MediaQuery>
      </span>
    }

    var hashtags = ['CSCI_571_NewsApp'];
  return(
    <div>
      <Accordion>
        <Card style={cardStyle}>
          <Card.Body>
            <MediaQuery maxDeviceWidth = {991}>
            <Card.Title style={cardtitle}> <h1 style={{fontSize: '120%'}}><i> {title} </i></h1></Card.Title>
            </MediaQuery>
            <MediaQuery minDeviceWidth = {992}>
            <Card.Title style={cardtitle}> <h1 style={{fontSize: '130%'}}> <i> {title} </i> </h1></Card.Title>
            </MediaQuery>
            <Row style={bigCardTop}>
              <Col md={9} sm={5} xs={5} style={{float:'left'}}>
                <MediaQuery minDeviceWidth = {992}>
                <p style={{fontSize:'110%'}}> <i> {dt} </i> </p>
                </MediaQuery>
                <MediaQuery maxDeviceWidth = {991}>
                <p style={{fontSize:'90%'}}> <i> {dt} </i> </p>
                </MediaQuery>
              </Col>
              <Col md={2} sm={5} xs={5}>
                <p style={{float:'right'}}>

                  <OverlayTrigger
                    key = "Facebook"
                    placement="top"
                    overlay={
                      <Tooltip>
                        Facebook
                      </Tooltip>
                    }>
                      <FacebookShareButton url={url} hashtag='#CSCI_571_NewsApp'>
                        <MediaQuery minDeviceWidth = {992}>
                          <FacebookIcon size={30} round={true} />
                        </MediaQuery>
                        <MediaQuery maxDeviceWidth = {991}>
                          <FacebookIcon size={25} round={true} />
                        </MediaQuery>

                      </FacebookShareButton>
                  </OverlayTrigger>

                  <OverlayTrigger
                    key = "Twitter"
                    placement="top"
                    overlay={
                      <Tooltip>
                        Twitter
                      </Tooltip>
                    }>
                    <TwitterShareButton url={url} hashtags={hashtags}>
                      <MediaQuery minDeviceWidth = {992}>
                        <TwitterIcon size={30} round={true} />
                      </MediaQuery>
                      <MediaQuery maxDeviceWidth = {991}>
                        <TwitterIcon size={25} round={true} />
                      </MediaQuery>
                    </TwitterShareButton>
                    </OverlayTrigger>

                    <OverlayTrigger
                      key = "Email"
                      placement="top"
                      overlay={
                        <Tooltip>
                          Email
                        </Tooltip>
                      }>
                      <EmailShareButton subject='#CSCI_571_NewsApp' url={url} seperator={' '}>
                      <MediaQuery minDeviceWidth = {992}>
                        <EmailIcon size={30} round={true} />
                      </MediaQuery>
                      <MediaQuery maxDeviceWidth = {991}>
                        <EmailIcon size={25} round={true} />
                      </MediaQuery>
                      </EmailShareButton>
                    </OverlayTrigger>

                </p>
              </Col>
              <Col md={1} sm={2} xs={2}>

                {bookmarkIcon}

              </Col>
            </Row>
            <Card.Img variant="top" style={cardimg} src={img} />
            <Card.Text style={cardtext}>
              {cardText}
            </Card.Text>

          </Card.Body>
        </Card>
        </Accordion>
    <div style={{height:'10%', overflowY:'hidden'}}>
    <Commentcomp pId = {this.props.id}/>
    </div>
    </div>

  );
}
}

export default Bighomecard
