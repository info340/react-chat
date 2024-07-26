import React, { useState } from 'react';

import { HeaderBar } from './HeaderBar.js';
import ChatPage from './ChatPage.js';
import SignInPage from './SignInPage.js';
import * as Static from './StaticPages';

import INITIAL_CHAT_LOG from '../data/chat_log.json'
import DEFAULT_USERS from '../data/users.json';

function App(props) {
  const [currentUser, setCurrentUser] = useState(DEFAULT_USERS[1]) //initialize
  const [msgStateArray, setMsgStateArray] = useState(INITIAL_CHAT_LOG);

  /* STATE MANAGEMENT: how do we change */
  const changeUser = (newUserObj) => {
    setCurrentUser(newUserObj);
  }

  const addMessage = (userObj, msgText, channel) => {
    const newMessageObj = {
      "userId": userObj.userId,
      "userName": userObj.userName,
      "userImg": userObj.userImg,
      "text": msgText,
      "timestamp": Date.now(),
      "channel": channel
    }

    const updateMessageArray = [...msgStateArray, newMessageObj];
    setMsgStateArray(updateMessageArray); //update the state and re-render
  }

  return (
    <div className="container-fluid d-flex flex-column">
      <HeaderBar currentUser={currentUser} />

      <Static.WelcomePage />
      {/* <ChatPage 
        currentUser={currentUser} 
        messageArray={msgStateArray}
        addMessageFunction={addMessage}
        /> */}
      {/* <Static.AboutPage /> */}
      {/* <SignInPage currentUser={currentUser} changeUserFunction={changeUser} /> */}
      {/* <Static.ErrorPage /> */}
    </div>
  );
}

export default App;