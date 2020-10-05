import React, { Component } from 'react';
import Bighomecard from './bighomecard';

class Bigwrapper2 extends Component{

  constructor(props){
    super(props);
    this.state={
      res: [],

    };
  }

  componentDidMount(){

    console.log(localStorage.getItem('check') === "true");
    if(localStorage.getItem('check') === "true"){
      console.log("GIARDIAN");
      var receivedId = this.props.id;
      console.log(receivedId);
      // var id = receivedId.slice(7);
      var len = receivedId.length;
      const mainId = receivedId.slice(5,len);
      console.log(mainId);
      var newsSource = "guardian";
      var tUrl = "http://localhost:3000/guardian/post?id="+mainId;
      // console.log(this.state.postId);
      // var url = 'https://content.guardianapis.com/search?api-key=7b488434-d103-4371-8e49-c4f87d4e147c&section=(sport|business|technology|politics)&show-blocks=all';
      fetch(tUrl).then(response => response.json())
        .then(data =>
            this.setState({
              res: data.response.content,
            }));
      if(this.state.res != null){
        var assetlength = this.state.res.blocks.main.elements[0].assets.length
        if(assetlength > 0)
          var imageVar = this.state.res.blocks.main.elements[0].assets[assetlength-1].file;
        else {
          var imageVar = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
        }

        if( this.state.res.webPublicationDate != null){
          var dateVar = this.state.res.webPublicationDate.slice(0,10);
        }
        if(this.res.blocks != null)
        console.log("Updating state");
        this.setState({
            title: this.state.res.webTitle,
            image: imageVar,
            date: this.state.docs[0].pub_date.slice(0,10),
            description: this.state.docs[0].abstract,
            url: this.state.res.webUrl,
        });
      }

    }
    else{
      var receivedId = this.props.id;
      console.log(receivedId);
      // var id = receivedId.slice(7);
      var len = receivedId.length;
      const mainId = receivedId.slice(6,len);
      console.log("Main ID");
      console.log(mainId);
      var newsSource = "nytimes"
      console.log(newsSource);
      console.log(mainId);
      var url = "http://localhost:3000/nytimes/post?id="+mainId;
      var newurl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("' +mainId+ '")&api-key=IJzJ5lFl6T5Ga58P8X2FzPMAhVC0OIYr';
      var ny_url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("' +mainId+ '")&api-key=JaqoSraF2BGAv21wCGQXb8jvQmv1upkV';

      console.log(ny_url);
      fetch(ny_url)
        .then(response => response.json())
        .then(data => this.setState({
          res: data.response.docs,
        }),
        console.log(this.data),
        console.log(this.state.res)
      );
        console.log(this.state);
      console.log(this.data);
      console.log(this.state.res);
      if(this.state.res != null){
        console.log(this.state.res);
        // var multiLength = this.state.res.docs[0].multimedia.length
        // if(multiLength > 0)
          // var imageVar = this.state.res.docs[0].multimedia[multiLength - 1].url;
        // else {
          // var imageVar = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
        // }

        if( this.state.res[0].pub_date != null)
          var dateVar = this.state.res[0].pub_date.slice(0,10)
        console.log("updating ny times state");
        this.setState({
          postId: this.mainId,
          source: 'nytimes',
            title: this.state.res[0].headline.main,
            image: imageVar,
            date: dateVar,
            description: this.state.res[0].abstract,
            url: this.state.res[0].web_url,

        });
      }
    }
    // this.setState({
    //   postId: this.mainId,
    //   source: 'guardian',
    // })
  }

  render(){
    console.log(this.state.res);
    var receivedId = this.props.id;
    var len = receivedId.length;
    var sendingId = receivedId.slice(5,len);
    console.log(this.state.res);
    console.log(this.state.data);
    return(
      <div>
      <Bighomecard
        title = {this.state.title}
        image = {this.state.image}
        date = {this.state.date}
        description = {this.state.description}
        url = {this.state.url}
        source={this.state.source}/>

      </div>

    );
  }

}

export default Bigwrapper2
