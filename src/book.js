import React, { Component } from 'react';
import Page from './page.js';

class Book extends Component {
    constructor(props) {
    super(props);
  }

  render() {
      // should be able to access a particular entry with a get request.
    return (
      <div className="Book">
        <Page entry = {this.props.entry} user={this.props.user} updateEntry={this.props.updateEntry} />
      </div>
    );
  }
}

export default Book;