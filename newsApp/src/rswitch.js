import React, { Component } from "react";
import Switch from "react-switch";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import MediaQuery from 'react-responsive';

class Rswitch extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){

    if(localStorage.getItem('check') == null){
      this.setState({checked: true})
      localStorage.setItem('check', 'true');
    }
    else{
      const checked = localStorage.getItem('check') === 'true';
      this.setState({checked: checked});
    }

  }

  handleChange(checked) {
    this.setState({ checked: checked });
    const check = checked;
    localStorage.setItem('check', check);
    window.location.reload(true);
  }

  render() {
    const nyNameStyle = {


      fontSize:'120%',
      color:'white'
    };
    const guardianNameStyle = {
      // paddingLeft:'0px',
      // padingRight:'10px',
      // marginLeft: '15px',
      // marginRight: '10px',
      fontSize:'125%',
      color:'white'
    };
    const swtichStyle = {
        marginBottom:'1.75%'
    };

    return (



      <Row style={swtichStyle}>
      <MediaQuery minDeviceWidth={992}>
        <Col lg={4} xs={12}>

        <span style={nyNameStyle}>NYTimes</span></Col>

        <Col lg={3} xs={12}>

          <Switch onChange={this.handleChange}
          checked={localStorage.getItem('check') === 'true'}
          checkedIcon={false}
          uncheckedIcon={false}
          offColor={'#DDDDDD'}
          onColor={'#5891ED'}/>

        </Col>
        <Col lg={5} xs={12}>
        <span style={guardianNameStyle}>Guardian</span>
        </Col>
      </MediaQuery>

      <MediaQuery maxDeviceWidth={991}>
        <Col lg={4} xs={12} style={{paddingTop: '1%', paddingBottom: '1%'}}>

        <span style={nyNameStyle}>NYTimes</span></Col>

        <Col lg={3} xs={12} style={{paddingTop: '1%', paddingBottom: '1%'}}>

          <Switch onChange={this.handleChange}
          checked={localStorage.getItem('check') === 'true'}
          checkedIcon={false}
          uncheckedIcon={false}
          offColor={'#DDDDDD'}
          onColor={'#5891ED'}/>

        </Col>
        <Col lg={5} xs={12} style={{paddingTop: '1%'}}>
        <span style={guardianNameStyle}>Guardian</span>
        </Col>
      </MediaQuery>

      </Row>
    );
  }
}

export default Rswitch
