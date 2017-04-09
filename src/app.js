import React, { Component } from 'react';
import Book from './book.js';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      user: "LittleToy",
      entry: "",
      date: ""
    };
    this.updateTitle = this.updateTitle.bind(this);
    this.updateEntry = this.updateEntry.bind(this);
    this.postToDB = this.postToDB.bind(this);
    this.logTime = this.logTime.bind(this);
    this.getFromDB = this.getFromDB.bind(this);
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

//function that will grab current state and make post request
 postToDB () {
   axios.post('http://localhost:3000/entries', {
     user: this.state.user,
     title: this.state.title,
     entry: this.state.entry,
     logTime: this.logTime()
   }).then((response) => {
     console.log("I am from Axios post request: ", response)
   })
 }

//get entries from DB
getFromDB() {
   axios.get('http://localhost:3000/findEntries')
   .then((response) => {
     //console.log("I am from axios get request: ", response);

     //will fild the object with the title in the seachbox
       let searchItem = document.getElementById('searchField').value;
       let result = response.data.filter((element, index) => searchItem === element.title)

        //populate fields with past information
        this.setState({
            user: result[0].user,
            title: result[0].title,
            entry: result[0].entry
        })
     })
  .catch((err) => console.log(err))
}

  render() {
    return (
      <div className="App">
        <Book entry = {this.state.entry} user={this.state.user} title={this.state.title} updateTitle={this.updateTitle} logTime={this.logTime()} 
        updateEntry={this.updateEntry} postToDB={this.postToDB} getFromDB={this.getFromDB} />
      </div>
    );
  }
}

export default App;