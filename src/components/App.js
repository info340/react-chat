import React from 'react';

import { HeaderBar } from './HeaderBar.js';
import { ChannelList } from './ChannelList.js';
import { MessagePane } from './MessagePane.js';

function App(props) {
  return (
    <div>
        <HeaderBar />
        <div className="d-flex">
          <ChannelList />
          <MessagePane />
        </div>

    </div>
  );
}

export default App;