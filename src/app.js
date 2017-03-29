import React, { Component } from 'react';
import Book from './book.js';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      user: "LittleToy",
      entry: ""
    };
    this.updateTitle = this.updateTitle.bind(this);
    this.updateEntry = this.updateEntry.bind(this);
    this.postToDB = this.postToDB.bind(this);
    this.logTime = this.logTime.bind(this);
  }

//will get the time and date of the diary entry
logTime () {
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date+' '+time;
  return dateTime
}

 //custom function to update state based on entry entries
 updateEntry(event) {
  this.setState({entry: event.target.value});
 }

 updateTitle(event) {
   this.setState({title: event.target.value})
 }

//function that will 1. grab current state, 2. put stuff into SQlite
 postToDB () {
   // do a ajax request
   axios.post('http://localhost:3000/entries', {
     user: this.state.user,
     title: this.state.title,
     entry: this.state.entry,
     logTime: this.logTime()
   }).then((response) => {
   })
 }

  render() {

    console.log(this.state.title)
    return (
      <div className="App">
        <Book entry = {this.state.entry} user={this.state.user} title={this.updateTitle} logTime={this.logTime()} updateEntry={this.updateEntry} postToDB={this.postToDB}/>
      </div>
    );
  }
}

export default App;