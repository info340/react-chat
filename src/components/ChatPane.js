import React, { useState } from 'react';

import { ComposeForm } from './ComposeForm.js'

import INITIAL_CHAT_LOG from '../data/chat_log.json'

export function ChatPane(props) {
  const { currentChannel, currentUser } = props;

  const [msgStateArray, setMsgStateArray] = useState(INITIAL_CHAT_LOG);

  /* STATE MANAGEMENT: how do we change */
  const addMessage = (userObj, msgText) => {
    const newMessageObj = {
      "userId": userObj.userId,
      "userName": userObj.userName,
      "userImg": userObj.userImg,
      "text": msgText,
      "timestamp": Date.now(),
      "channel": currentChannel
    }

    const updateMessageArray = [...msgStateArray, newMessageObj];
    setMsgStateArray(updateMessageArray); //update the state and re-render
  }

  /* RENDERING: what do we look like */
  // Data Processing (structure data)
  const messageObjArray = msgStateArray
    .filter((chatObj) => chatObj.channel === currentChannel)
    .sort((m1, m2) => m1.timestamp - m2.timestamp); //chron order

  // Displaying Data (convert to HTML)
  const messageElemArray = messageObjArray.map((chatObj) => {
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

      <ComposeForm currentUser={currentUser} currentChannel={currentChannel} addMessageFunction={addMessage} />
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