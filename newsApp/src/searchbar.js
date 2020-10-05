import React, { Component } from 'react';

import AsyncSelect from 'react-select/lib/Async';
import { colourOptions } from './docs/data';
import { Redirect } from "react-router-dom";
import _ from 'lodash';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Route, Switch, Link, withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';

export const history = createBrowserHistory();

class Searchbar extends Component {

  constructor(props){
    super(props);
    this.state={
      redirect: null,
      checked: localStorage.getItem('check') === 'true',
      inputValue: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleInputChange = (newValue) => {
    this.setState({ newValue });
    return newValue;
  };

  handleSearchChange = (optdata) => {
    this.setState({
      inputValue: optdata.value
    },() => {
      if(this.state.checked === true)
      {
        // this.props.history.push('/search?guq='+ optdata.value);
        this.props.history.push('/search?q='+ optdata.value);

      }
      else {
        // this.props.history.push('/search?nyq='+ optdata.value);
        this.props.history.push('/search?q='+ optdata.value);
      }

    });
  }


  async fetching(inputValue){
    if(!inputValue){
      return [];
    }

    var qUrl = 'https://[AZURE USERNAME].cognitiveservices.azure.com/bing/v7.0/suggestions?q='+inputValue;
    const response = await fetch(qUrl, {
        headers: {
          'Ocp-Apim-Subscription-Key': 'KEY'
        }
      }
    );

    let drop_options = [{value: inputValue,label: inputValue}];
    const result = await response.json();

    if(result.suggestionGroups !== null)
    {
      result.suggestionGroups[0].searchSuggestions.map( (suggestion) => {
        drop_options.push({value: suggestion.displayText,label: suggestion.displayText})
      })
      return drop_options;
    }
  }


  render() {
    console.log(this.props.searchval);

    const barStyle = {
      marginLeft: "1%",
      marginRight: "2%",
      color:"black",
      
    }

    if(this.props.searchval === "empty"){
      return (
        <div style={barStyle}>
        <AsyncSelect
          id="searchbar"
          loadOptions={this.fetching}
          noOptionsMessage = {() => "No Match"}
          onInputChange={_.debounce(this.handleInputChange, 1000)}
          defaultInputValue = ""
          onChange={this.handleSearchChange}
          placeholder="Enter Keyword..."/>
        </div>
      );
    }
    else{
      return (
        <div style={barStyle}>
        <AsyncSelect
          id="searchbar"
          loadOptions={this.fetching}
          noOptionsMessage = {() => "No Match"}
          onInputChange={_.debounce(this.handleInputChange, 1000)}
          defaultInputValue = {this.props.searchval}
          onChange={this.handleSearchChange}
          placeholder="Enter Keyword..."/>
        </div>
      );

    }

  }
}

export default withRouter(Searchbar)
