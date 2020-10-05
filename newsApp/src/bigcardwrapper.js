import React, { Component } from 'react';
import Bighomecard from './bighomecard';
import Navbarhead from './navbarhead';
import Spinner from 'react-bootstrap/Spinner';
import MediaQuery from 'react-responsive';
import BounceLoader from 'react-spinners/BounceLoader';
import { css } from "@emotion/core";

class Bigcardwrapper extends Component{
  _isMounted = false;
  constructor(props){
    super(props);
    this.state={
      res: [],
      loading: true,
    };
  }

  componentDidMount(){
    localStorage.setItem('displaySwitch', 'off');
    this.forceUpdate();
    if(!this.props.id.includes('nytimes')){
      this._isMounted = true;
      var receivedId = this.props.id;
      console.log(receivedId);
      var len = receivedId.length;
      const mainId = receivedId.slice(5,len);
      // var newsSource = "guardian";
      var url = "http://localhost:3000/guardian/post?id="+mainId;
      console.log(url)
      // console.log(this.state.postId);
      // var url = 'https://content.guardianapis.com/search?api-key=7b488434-d103-4371-8e49-c4f87d4e147c&section=(sport|business|technology|politics)&show-blocks=all';
      fetch(url).then(response => response.json())
        .then(data =>
            this.setState({
              res: data.response.content,
              loading: false,
              source: 'guardian',
              id: mainId
            }));


    }
    else{
      this._isMounted = true;
      var receivedId = this.props.id;
      console.log(receivedId);
      var len = receivedId.length;
      const mainId = receivedId.slice(6,len);
      // var newsSource = "guardian";
      var url = "http://localhost:3000/nytimes/post?id="+mainId;
      console.log(url)
      // console.log(this.state.postId);
      // var url = 'https://content.guardianapis.com/search?api-key=7b488434-d103-4371-8e49-c4f87d4e147c&section=(sport|business|technology|politics)&show-blocks=all';
      fetch(url).then(response => response.json())
        .then(data =>
            this.setState({
              res: data.response.docs[0],
              loading: false,
              source: 'nytimes',
              id: mainId

            }));

    }

    document.getElementById('toggleSwitch').style.display = 'none';


  }

  render(){
    console.log(this.state.res);

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


    if(this.state.loading){
      return(
        <div>
        <Navbarhead searchval = "empty"/>
        {spinner}
        </div>

      );

    }
    else{
      return(
        <div>
        <Navbarhead searchval = "empty"/>
        <Bighomecard
          data = {this.state.res} id={this.state.id} source = {this.state.source}/>
        </div>

      );

    }


  }

}

export default Bigcardwrapper
