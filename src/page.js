import React from 'react';

const Page = (props) => {
  return (
    <div className="Page">
      <br /><br />
      <div className="dateEntry">Entry for the Date: {props.logTime}</div>
      <div className="titleEntry">Title:  <input type="text" className="currTitle" value={props.title} onChange={props.updateTitle} />  </div>

      <div>
        <textarea className="entry" placeholder="Start Writing..." cols="70" wrap="soft" rows="30"
          onChange={props.updateEntry} value={props.entry}>
        </textarea>
      </div>

      <div >
        <input id="inputEntry" type="submit" className="button" value="Input Your Story" onClick={props.postToDB} />
      </div>

    </div>
  )
}

export default Page;