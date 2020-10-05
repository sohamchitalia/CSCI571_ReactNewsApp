import React, { Component } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Homecard from './homecard';
import Bighomecard from './bighomecard';
import { newsData } from './sampledata';
import Spinner from 'react-bootstrap/Spinner';
import BounceLoader from 'react-spinners/BounceLoader';
import { css } from "@emotion/core";
import Navbarhead from './navbarhead';
import MediaQuery from 'react-responsive';

class Homegrid extends Component{
  constructor(props) {
    super(props);
    this.state = {
      res: [],
      loading: true,
      source: ''
    };

    this.cutDesc = this.cutDesc.bind(this);
  }

  componentDidMount() {
    console.log(localStorage.getItem('check'));
    if(localStorage.getItem('check') === "true"){
      var newsSource = "guardian";
      this.setState({source: 'guardian'});
    }
    else{
      var newsSource = "nytimes"
      this.setState({source: 'nytimes'});
    }
    if(newsSource == 'guardian'){
      var url = "http://localhost:3000/guardian";
      fetch(url).then(response => response.json())
        .then(data =>
            this.setState({
              res: data.response.results,
              loading: false
            }));
    }
    else{
      console.log(newsSource);
      var url = "http://localhost:3000/nytimes";
      fetch(url).then(response => response.json())
        .then(data =>
            this.setState({
              res: data.results,
              loading: false
            }));

    }
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        document.getElementById('toggleSwitch').style.display = 'block';
        document.getElementById("home").classList.add('activeButton');
        document.getElementById("world").classList.remove('activeButton');
        document.getElementById("politics").classList.remove('activeButton');
        document.getElementById("business").classList.remove('activeButton');
        document.getElementById("technology").classList.remove('activeButton');
        document.getElementById("sports").classList.remove('activeButton');
  }


cutDesc(sent){
    var content = sent.trim();
  	var newcontent = content.split(' ');
  	// content = content.split(' ');
  	var newstr = "";
  	var chars = 0;
  	for(var i = 0; i<newcontent.length; i++){
  		if((chars + newcontent[i].length <= 320)){
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

  render(){
    const badgeColor = {
      sport:"warning",
      business:"info",
      politics: "success",
      world: "primary",
      technology: "success",
      health: "secondary"
    }

    const spinnerStyle= {

      marginLeft: '49%',
      marginRight: '51%',
      marginTop:'20%'

    }

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
      margin: auto;
      text-align: center;
      margin-top: 20%;
      `;

    const spinner =
    <div>
    <MediaQuery minDeviceWidth={992}>
    <div style={{width:'100%', margin:'auto', textAlign:'center'}}>
      <BounceLoader size="60" css = {override} color='blue' style={spinnerStyle}/>
      <h1 style={{fontSize:'160%', margin:'auto', textAlign:'center'}}>   Loading </h1>
    </div>
    </MediaQuery>

    <MediaQuery maxDeviceWidth={991}>
    <div style={{width:'100%', margin:'auto', textAlign:'center', marginTop: '65%'}}>
      <BounceLoader size="60" css = {override} color='blue' style={spinnerStyle}/>
      <h1 style={{fontSize:'160%', margin:'auto', textAlign:'center'}}>   Loading </h1>
    </div>
    </MediaQuery>
    </div>



    if(this.state.source == 'guardian'){
      var elements = [];
      for(var i = 0; i < this.state.res.length; i++){
        var element = this.state.res[i];
        if(element != null){
          var desc = this.cutDesc(element.blocks.body[0].bodyTextSummary);
          var url = element.webUrl;
          var dt = element.webPublicationDate.slice(0,10);
          if(element.blocks!= null && element.blocks.main != null && element.blocks.main.elements!= null){
            var assetlength = element.blocks.main.elements[0].assets.length
            if(assetlength > 0)
              var img = element.blocks.main.elements[0].assets[assetlength-1].file;
            else {
              var img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
            }
          }
          else {
            var img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
          }
          var bcolor = badgeColor[element.sectionId];
          var sect = element.sectionId.toUpperCase();
          var id = element.id;
          elements.push(<Homecard
            id={id}
            section = {sect}
            title={element.webTitle}
            description={desc}
            date={dt}
            image = {img}
            badgecolor = {bcolor}
            url = {url}
            />);
        }
      }
    }
    else{

      var elements = [];
      var looplen = 10;

      if(this.state.res != null && this.state.res.length < 10)
        looplen = this.state.res.length;
      for(var i = 0; i < looplen; i++){
        var element = this.state.res[i];
        if(element != null){
          var desc = this.cutDesc(element.abstract);
          var dt = element.published_date.slice(0,10);
          if(element.multimedia != null){
            var assetlength = element.multimedia.length;
            var imgset = false
            for(var j = 0; j < assetlength; j++){
              if(element.multimedia[j].width >= 2000){
                var img = element.multimedia[j].url;
                imgset = true;
                break;
              }
            }
            if(imgset != true){
              var img = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
            }

          }
          else {
            var img = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
          }
        }
        else{
          var img = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
        }
          var bcolor = badgeColor[element.section];
          if(bcolor == null)
            bcolor = 'secondary';
          var sect = element.section.toUpperCase();
          var id = element.url;
          elements.push(<Homecard
            id={id}
            section = {sect}
            title={element.title}
            description={desc}
            date={dt}
            image = {img}
            badgecolor = {bcolor}
            url = {element.url}


            />);
        }
      }

    if(this.state.loading){
      return(
        <div>
        <Navbarhead searchval = "empty"/>
        {spinner}
      </div>
    );
    }
    else{
      return (
        <div>
        <Navbarhead searchval = "empty"/>
          {elements}
        </div>
      );
  }
}

}
export default Homegrid
