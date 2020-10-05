import React, { Component } from 'react';
import Bighomecard from './bighomecard';
import Searchresults from './searchresults';


function Routesearch({location}){
  console.log({location})
  return(
    <div>
      <Searchresults id = {location.search} />
    </div>
  )
}

export default Routesearch
