import React, { Component } from 'react';

class Page extends Component {
    constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.entry) // logs the current state and the text entry
    console.log(this.props.updateEntry) //logs the function itself
    return (
      <div className="Page">
        <div className="Welcome">
          <h2>Welcome to Dear Diary, {this.props.user}</h2>
            <div>
            <textarea className="Entry" placeholder="Start Writing..." cols="90" wrap="soft" rows="100" 
                onChange={this.props.updateEntry}>
            </textarea>
            <input type="submit" value="Log" />
            </div>
        </div>
      </div>
    );
  }
}

export default Page;