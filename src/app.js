import React, { Component } from 'react';
import Book from './book.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      entry: "",
      user: "LittleToy"
    };
    this.updateEntry = this.updateEntry.bind(this);
  }

 //custom function to take care of entries
 updateEntry(event) {
  //will change state based on the journal entry
  this.setState({entry: event.target.value});
 }

  render() {
    return (
      <div className="App">
        <Book entry = {this.state.entry} user={this.state.user} updateEntry={this.updateEntry} />
      </div>
    );
  }
}

export default App;