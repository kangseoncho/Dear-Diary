import React from 'react';
import Page from './page.js';

const Book = (props) => {
  //should work logic to render all prev entries here
  return (
     <div className="Book">
        <Page user={props.user} updateTitle={props.updateTitle} entry = {props.entry} title={props.title}
        logTime={props.logTime} updateEntry={props.updateEntry} postToDB={props.postToDB} getFromDB={props.getFromDB}
        updateSearchDate={props.updateSearchDate} />
      </div>
  )
}


export default Book;