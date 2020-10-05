import React, { Component } from 'react';
import Searchcard from './searchcard';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Navbarhead2 from './navbarhead2';
import Navbarhead from './navbarhead';

class Searchresults extends Component{
  constructor(props){
    super(props);
    this.state={
      source : '',
      res: [],
      url: '',
      loading: true,
    }
  }

  componentDidMount(){

    console.log(this.props);

    if(localStorage.getItem('check') === 'true'){
      this.setState({
        source: 'guardian'
      });
      // var keyword = this.props.location.search.slice(5);
      var keyword = this.props.id.slice(3);

      console.log(keyword);
      var url = "http://localhost:3000/guardian/search?guq="+keyword;
      if(this.state.url != url){
        this.setState({
          url:url
        });
      }
      fetch(url).then(response => response.json())
        .then(data =>
            this.setState({
              res: data.response.results,
              loading: false
            }));
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.

    }
    else{
      this.setState({
        source: 'nytimes'
      });

      var keyword = this.props.id.slice(3);
      console.log(keyword);
      var url = "http://localhost:3000/nytimes/search?nyt="+keyword;
      fetch(url).then(response => response.json())
        .then(data =>
            this.setState({
              res: data.response.docs,
              loading: false
            }));
    }

    document.getElementById("home").classList.remove('activeButton');
    document.getElementById("world").classList.remove('activeButton');
    document.getElementById("politics").classList.remove('activeButton');
    document.getElementById("business").classList.remove('activeButton');
    document.getElementById("technology").classList.remove('activeButton');
    document.getElementById("sports").classList.remove('activeButton');

    document.getElementById('toggleSwitch').style.display = 'none';
  }

  componentDidUpdate(prevState, prevProps){
    if(prevState.id.slice(3) != this.props.id.slice(3)){
      if(localStorage.getItem('check') === 'true'){
        this.setState({
          source: 'guardian'
        });
        // var keyword = this.props.location.search.slice(5);
        var keyword = this.props.id.slice(3);
        console.log(this.props);
        console.log(keyword);
        var url = "http://localhost:3000/guardian/search?guq="+keyword;
        if(this.state.url != url){
          this.setState({
            url:url
          });
        }
        fetch(url).then(response => response.json())
          .then(data =>
              this.setState({
                res: data.response.results,
                loading: false
              }));
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.

      }
      else{
        this.setState({
          source: 'nytimes'
        });

        // var keyword = this.props.location.search.slice(5);
        var keyword = this.props.id.slice(3);
        var url = "http://localhost:3000/nytimes/search?nyt="+keyword;
        fetch(url).then(response => response.json())
          .then(data =>
              this.setState({
                res: data.response.docs,
                loading: false
              }));
      }
  }


  }

  render(){
    var elements = [];
    if(this.state.source == 'guardian'){
      for(var i = 0; i < this.state.res.length; i++){
        var element = this.state.res[i];
        if(element != null){
          // var desc = element.blocks.body[0].bodyTextSummary;
          var dt = element.webPublicationDate.slice(0,10);
          var weburl = element.webUrl
          if(element.blocks!=null && element.blocks.main != null && element.blocks.main.elements != null){
            var assetlength = element.blocks.main.elements[0].assets.length
            if(assetlength > 0)
              var img = element.blocks.main.elements[0].assets[assetlength-1].file;
            else {
              var img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
            }
          }
          else{
            var img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
          }
          var sect = element.sectionId.toUpperCase();
          var id = element.id;
          elements.push(<Col md={4} lg={3} sm={12} xs={12}><Searchcard
            style={{
              width:'100%',
              float:'left',
              margin:'auto'}}
            source = 'GUARDIAN'
            id={id}
            section = {sect.toUpperCase()}
            title={element.webTitle}
            // description={desc}
            date={dt}
            url = {weburl}
            image = {img}
            badgecolor = "warning"
            /></Col>);
        }
      }

    }

    if(this.state.source == 'nytimes'){


      console.log(this.state.res);
      for(var i = 0; i < this.state.res.length; i++){
        var element = this.state.res[i];
        console.log(element);
        if(element != null){
          // var desc = element.abstract;
          var dt = element.pub_date.slice(0,10);
          var weburl = element.web_url;
          if(element.multimedia != null){
            var assetlength = element.multimedia.length;
            if(assetlength > 0){
              var imgset = false;
              for(var j=0; j<assetlength; j++){
                if(element.multimedia[j].width >= 2000){
                  // console.log(element.multimedia[j].url);
                  var img = "https://www.nytimes.com/"+element.multimedia[j].url;
                  imgset = true;
                }
              }
              if(imgset != true)
                var img = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
            }
            else {
              var img = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
            }
          }
          else{
            var img = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
          }
          console.log(img);
          if(element.news_desk != null)
            var sect = element.news_desk.toUpperCase();
          if(element.web_url != null)
            var id = element.web_url;
          elements.push(<Col md={4} lg={3} sm={6} xs={12}><Searchcard
            style={{
              width:'100%',
              float:'left',
              margin:'auto'}}
            source = 'nytimes'
            id={id}
            section = {sect}
            title={element.headline.main}
            // description={desc}
            date={dt}
            image = {img}
            url = {weburl}
            badgecolor = "warning"
            /></Col>);
        }
      }

    }
    console.log(elements);

    if(this.state.loading == false){

      if(elements.length > 0){
        return(
          <div>
          <Navbarhead searchval = {this.props.id.slice(3)}/>
          <h1 style={{marginLeft: '2%', fontSize:'190%'}}>
          Results
          </h1>
          <Container fluid>
          <Row style={{paddingRight:'0.75%'}}>
          {elements}
          </Row>
          </Container>
          </div>
        );
      }
      else{
        return(
        <div>
        <Navbarhead searchval = {this.props.id.slice(3)}/>
        <h1 style={{margin: 'auto', fontSize:'190%', textAlign:'center'}}>
        No Results
        </h1>
        </div>
        );
      }
    }
    else{
      return(
        <div>
        <Navbarhead searchval = {this.props.id.slice(3)}/>
        </div>
      );
    }
  }


}

export default Searchresults
