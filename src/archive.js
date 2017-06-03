import React from 'react';

const Archive = (props) => {
  return (
    <div className="Page">
      <br /><br />
      <div className="dateEntry">Entry for the Date: {props.logTime}</div>
      <div className="titleEntry">Title:  <input type="text" className="currTitle" value={props.title} readOnly="readOnly" />  </div>

      <div>
        <textarea className="entry" placeholder="Start Writing..." cols="70" wrap="soft" rows="30"
          value={props.entry} readOnly="readOnly">
        </textarea>
      </div>

    </div>
  )
}

export default Archive;