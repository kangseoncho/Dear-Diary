import React, { Component } from 'react';

class Page extends Component {
  //   constructor(props) {
  //   super(props);
  // }

  render() {
    //console.log(this.props.entry) // logs the current state and the text entry
    //console.log(this.props.updateEntry) //logs the function itself

    return (
      <div className="Page">
        <div className="Welcome">
          <h2>Welcome to Dear Diary, {this.props.user}</h2>
          <h4>Entry for the Date: {this.props.logTime}</h4>
          <h4>Title: </h4> <input type="text" onChange={this.props.title} />
            <div>
            <textarea className="Entry" placeholder="Start Writing..." cols="90" wrap="soft" rows="80" 
                onChange={this.props.updateEntry}>
            </textarea>
            <input type="submit" value="Log" onClick={this.props.postToDB}/>
            </div>
        </div>
      </div>
    );
  }
}

export default Page;