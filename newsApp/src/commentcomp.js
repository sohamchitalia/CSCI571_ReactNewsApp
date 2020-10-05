import React, { Component } from 'react';
import commentBox from 'commentbox.io';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

class Commentcomp extends Component{

    componentDidMount() {
       this.removeCommentBox = commentBox('5748087523901440-proj', {
         className: 'commentbox',
         ticParam: 'tic',

         createBoxUrl(boxId, pageLocation) {

            pageLocation.search = ''; // removes query string!
            pageLocation.hash = boxId; // creates link to this specific Comment Box on your page
            return pageLocation.href; // return url string
        },
       });

       console.log(commentBox('5748087523901440-proj'));
       console.log(this.props.pId);

    }

   componentWillUnmount() {

       this.removeCommentBox();
   }
  render(){
    if(this.props.pId != null){
      var id = this.props.pId;
      // id="http://localhost:3001/post"+id;
      console.log(id);
    }
    return(
      <div className="commentbox" id={id}>
      </div>
    )
  };

}

export default Commentcomp


// 5748087523901440-proj
