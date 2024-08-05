import React, { useState } from 'react';

import { ComposeForm } from './ComposeForm.js'

export function ChatPane(props) {
  const { currentChannel, currentUser, messageArray, addMessageFunction } = props;

  /* RENDERING: what do we look like */
  // Data Processing (structure data)
  const messagestoShowArray = messageArray
    .filter((chatObj) => chatObj.channel === currentChannel)
    .sort((m1, m2) => m2.timestamp - m1.timestamp); //chron order

  // Displaying Data (convert to HTML)
  const messageElemArray = messagestoShowArray.map((chatObj) => {
    const elem = <MessageItem key={chatObj.timestamp} messageData={chatObj} />
    return elem; //put it in the new array!
  });

  return (
    <> {/* fake div */}
      <div className="scrollable-pane pt-2 my-2">
        {/* conditional rendering */}
        { messageElemArray.length === 0 && 
          <p>No messages yet</p>
        }

        {messageElemArray}
      </div>

      <ComposeForm 
        currentUser={currentUser} 
        currentChannel={currentChannel} 
        addMessageFunction={addMessageFunction} />
  </>
  )
}


function MessageItem(props) {
  const messageData = props.messageData;
  const {userName, text, userImg} = messageData; //destructuring

  const likeButtonColor = "grey";

  return (
    <div className="message d-flex mb-2">
      <div className="me-2">
        <img src={userImg} alt={userName+"'s avatar"}/>
      </div>
      <div className="flex-grow-1">
        <p className="user-name">{userName}</p>
        <p>{text}</p>
        <button className="btn like-button">
            <span className="material-icons" style={{ color: likeButtonColor }}>favorite_border</span>
        </button>
      </div>
    </div> 
  )
}