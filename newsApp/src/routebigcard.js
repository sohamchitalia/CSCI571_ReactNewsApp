import React, { Component } from 'react';
import Bighomecard from './bighomecard';
import Bigcardwrapper from './bigcardwrapper';


function Routebigcard({location}){
  console.log({location})
  return(
    <div>
      <Bigcardwrapper id = {location.pathname} />
    </div>
  )
}

export default Routebigcard
