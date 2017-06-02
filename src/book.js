import React from 'react';
import Page from './page.js';
import Archive from './archive.js';

const Book = (props) => {
  let archives;
  //should work logic to render all prev entries here
  if (props.archive.length > 0) {
    archives = props.archive.map((element, index) => {
      return <Archive key={index} user={props.user} title={element.title} entry={element.entry} title={element.title}
        logTime={element.logTime} />
    })
    return (
      <div className="Book">
        {archives}
        <div>
          <input type="submit" onClick={props.backToWelcome} value="Back to Create Entry" />
        </div>
      </div>
    )
  } else {
    return (
      <div className="Book">
        <Page user={props.user} updateTitle={props.updateTitle} entry={props.entry} title={props.title}
          logTime={props.logTime} updateEntry={props.updateEntry} archive={props.archive}
          postToDB={props.postToDB} getFromDB={props.getFromDB}
          updateSearchDate={props.updateSearchDate} getAllFromDB={props.getAllFromDB} />
      </div>
    )
  }
}

export default Book;