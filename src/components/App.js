import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Navigate, useNavigate } from 'react-router-dom';

import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';

import { HeaderBar } from './HeaderBar.js';
import ChatPage from './ChatPage.js';
import SignInPage from './SignInPage.js';
import * as Static from './StaticPages';

import INITIAL_CHAT_LOG from '../data/chat_log.json'
import DEFAULT_USERS from '../data/users.json';

function App(props) {
  console.log("rendering app");
  const [currentUser, setCurrentUser] = useState(DEFAULT_USERS[1]) //initialize
  const [msgStateArray, setMsgStateArray] = useState(INITIAL_CHAT_LOG);

  const navigateTo = useNavigate(); //navigation hook

  //effect to run when the component first loads!
  useEffect(() => {
    //log in a default user
    changeUser(DEFAULT_USERS[1])
  }, [])

  useEffect(() => {
    //subscribe to the database
    const db = getDatabase();
    const allMessagesRef = ref(db, "allMessages") //address


    //addEventListener('firebase value change', function)
    onValue(allMessagesRef, (snapshot) => {
      const dataObj = snapshot.val();

      const keyArray = Object.keys(dataObj);
      const dataArray = keyArray.map((keyString) => {
        const transformed = dataObj[keyString]; //get value at that key
        transformed.firebaseKey = keyString;
        return transformed; //put into new array
      })

      setMsgStateArray(dataArray); //needs to be an [{},{},{}]
    });
  }, [])


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

    // const updateMessageArray = [...msgStateArray, newMessageObj];
    // setMsgStateArray(updateMessageArray); //update the state and re-render

    //add into firebase
    const db = getDatabase();
    const messageRef = ref(db, "message") //address
    const firstNameRef = ref(db, "name/first")
    const multiSegRef = ref(db, "path/to/data");
    const allMessagesRef = ref(db, "allMessages") //address

    //firebaseSet(messageRef, newMessageObj);
    firebasePush(allMessagesRef, newMessageObj);
  }

  return (
    <div className="container-fluid d-flex flex-column">
      <HeaderBar currentUser={currentUser} />

      <Routes>
        <Route index element={<Static.WelcomePage />} />
        <Route element={<ProtectedPage currentUser={currentUser} />} >
          <Route path="/chat/:channelName?" element={
            <ChatPage 
              currentUser={currentUser} 
              messageArray={msgStateArray}
              addMessageFunction={addMessage}
            />
          } />
        </Route>          
        <Route path="/signin" element={<SignInPage currentUser={currentUser} changeUserFunction={changeUser} />} />
        <Route path="/about" element={<Static.AboutPage />} />
        <Route path="*" element={<Static.ErrorPage />} />
      </Routes>

    </div>
  );
}

function ProtectedPage(props) {
  const {currentUser} = props;

  //...determine if user is logged in
  if(currentUser.userId === null) { //not undefined
    return <Navigate to="/signin"/>
  }
  else { //otherwise, show the child route content
    return <Outlet />
  }
}

export default App;