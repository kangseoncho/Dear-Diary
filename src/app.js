import React, { Component } from 'react';
import Book from './book.js';
import axios from 'axios';
import moment from 'moment';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      user: document.cookie.slice(5),
      entry: "",
      date: "",
      archive: []
    };
    this.updateTitle = this.updateTitle.bind(this);
    this.updateEntry = this.updateEntry.bind(this);
    this.postToDB = this.postToDB.bind(this);
    this.logTime = this.logTime.bind(this);
    this.getFromDB = this.getFromDB.bind(this);
    this.updateSearchDate = this.updateSearchDate.bind(this);
    this.getAllFromDB = this.getAllFromDB.bind(this);
    this.backToWelcome = this.backToWelcome.bind(this);
  }

  //will get the time and date of the diary entry
  logTime() {
    return moment().format('MMMM Do, YYYY'); //typeof === string
  }

  //custom function to update state based on entry entries
  updateEntry(event) {
    this.setState({ entry: event.target.value });
  }
  updateTitle(event) {
    this.setState({ title: event.target.value })
  }
  updateSearchDate(event) {
    this.setState({ searchDate: event.target.value })
  }

  //function that will grab current state and make post request
  postToDB() {
    axios.post('http://localhost:3000/entries', {
      user: this.state.user,
      title: this.state.title,
      entry: this.state.entry,
      logTime: this.logTime()
    }).then((response) => {
      alert("logged new blog entry");
      console.log("I am from Axios post request: ", response)
    })
  }

  //get entries from DB
  getFromDB() {
    axios.get('http://localhost:3000/getAllEntries')
      .then((response) => {
        //console.log("response from get request: ", response)
        //will fild the object with the title in the seachbox
        let searchUser = this.state.user;
        let searchDate = this.state.searchDate;
        let result = response.data.filter((element, index) => searchDate === element.logTime && element.user === searchUser)

        if (result.length === 0) {
          alert('no matching entries found!');
          this.setState({
            user: '',
            title: '',
            entry: ''
          })
        } else {
          //populate fields with past information
          this.setState({
            user: result[0].user,
            title: result[0].title,
            entry: result[0].entry
          })
        }
      })
      .catch((err) => console.log(err))
  }

  getAllFromDB() {
    axios.get('http://localhost:3000/getAllEntries')
      .then((response) => {
        let searchUser = this.state.user;
        let result = response.data.filter((element, index) => element.user === searchUser)
        this.setState({archive: result})
      })
      .catch((err) => console.log(err))
  }

  backToWelcome() {
    const tempArchive = [];
    this.setState({archive: tempArchive});
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome to Dear Diary, {this.state.user}</h1>

        <Book entry={this.state.entry} user={this.state.user} title={this.state.title} updateTitle={this.updateTitle} logTime={this.logTime()}
          archive={this.state.archive}
          updateEntry={this.updateEntry} postToDB={this.postToDB} getFromDB={this.getFromDB}
          updateSearchDate={this.updateSearchDate} getAllFromDB={this.getAllFromDB} backToWelcome={this.backToWelcome}/>

        <div className="log">
          Date: <input type="text" id="dateField" onChange={this.updateSearchDate}/> <br/>
          <input type="submit" className="button" value="Get Past Entry" onClick={this.getFromDB} />
          <input type="submit" className="button" value="Get All Past Entries" onClick={this.getAllFromDB} />
        </div>

      </div>
    );
  }
}

export default App;