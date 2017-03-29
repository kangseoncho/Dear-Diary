import React, { Component } from 'react';
import Page from './page.js';
import axios from 'axios';

class Book extends Component {
  //   constructor(props) {
  //   super(props);
  // }


  render() {
    // should be able to access a particular entry with a get request.
    return (
      <div className="Book">
        <Page user={this.props.user} title={this.props.title} entry = {this.props.entry} logTime={this.props.logTime} 
        updateEntry={this.props.updateEntry} postToDB={this.props.postToDB} />
      </div>
    );
  }
}

export default Book;