import React, { useState } from 'react';

import { ComposeForm } from './ComposeForm.js'

import INITIAL_CHAT_LOG from '../data/chat_log.json'

export function ChatPane(props) {
  console.log("rendering the ChatPane")  
  const { currentChannel } = props;

  const [messageArray, setMessageArray] = useState(INITIAL_CHAT_LOG);

  const addMessage = (userId, userName, msgText) => {
    //add a new message to the state
    const newMessageObj = {
      "userId": userId,
      "userName": userName,
      "userImg": "/img/"+userName+".png",
      "text": msgText,
      "timestamp": Date.now(),
      "channel": currentChannel
    }

    //makes a copy
    const updateMessageArray = [...messageArray, newMessageObj];

    //update the state AND re-renders
    setMessageArray(updateMessageArray);
  }

  //DATA PROCESSING
  const messageObjArray = messageArray
    .filter((chatObj) => chatObj.channel === currentChannel)
    .sort((m1, m2) => m1.timestamp - m2.timestamp); //chron order

  //RENDERING
  const messageElemArray = messageObjArray.map((chatObj) => {
    const elem = <MessageItem key={chatObj.timestamp} messageData={chatObj} />
    return elem; //put it in the new array!
  });

  return (
    <div className="scrollable-pane mt-2">
      {/* Messages */}
      {messageElemArray}

      <ComposeForm addMessageFunction={addMessage} />
    </div>
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