import React from 'react';

import { HeaderBar } from './HeaderBar.js';
import { ChannelList } from './ChannelList.js';
import { ChatPane } from './ChatPane.js';

function App(props) {

  //hard-coded for now
  const channelNamesArray = ["general", "social", "random", "dank-memes", "birds"];
  const currentChannel = "general";

  return (
    <div className="container-fluid d-flex flex-column">
      <HeaderBar />
      <div className="row flex-grow-1">
        <div className="col-3 pe-0">
          <ChannelList channelNames={channelNamesArray} currentChannel={currentChannel} />
        </div>
        <div className="col d-flex flex-column">
          <ChatPane currentChannel={currentChannel} />
        </div>
      </div>
    </div>
  );
}

export default App;