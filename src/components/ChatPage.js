import React from 'react';

import { useParams } from 'react-router-dom';

import { ChannelList } from './ChannelList.js';
import { ChatPane } from './ChatPane.js';

export default function ChatPage(props) {
  const {currentUser, messageArray, addMessageFunction} = props;

  const paramsObj = useParams();
  const currentChannel = paramsObj.channelName || "general";

  const channelNamesArray = ["general", "social", "random", "dank-memes", "birds"];

  return (
    <div className="row flex-grow-1">
      <div className="col-3">
        <ChannelList channelNames={channelNamesArray} currentChannel={currentChannel} />
      </div>
      <div className="col d-flex flex-column">
        <ChatPane
          currentUser={currentUser}
          currentChannel={currentChannel}
          messageArray={messageArray}
          addMessageFunction={addMessageFunction}
        />
      </div>
    </div>
  )
}