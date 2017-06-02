import React from 'react';

const Archive = (props) => {
  return (
    <div className="Page">
      <div className="Welcome">
        <br/><br/>
        <h4>Entry for the Date: {props.logTime}</h4>
        <h3>Title: <input type="text" className="currTitle" value={props.title} readOnly="readOnly" /> </h3>

        <div>
          <textarea className="Entry" placeholder="Start Writing..." cols="70" wrap="soft" rows="30"
          value={props.entry} readOnly="readOnly">
          </textarea>
        </div>

      </div>
    </div>
  )
}

export default Archive;