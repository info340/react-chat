import { ComposeForm } from './ComposeForm.js'

import INITIAL_CHAT_LOG from '../data/chat_log.json'

export function ChatPane(props) {
  //console.log("rendering the ChatPane")  

  const { currentChannel } = props;

  //DATA PROCESSING
  const messageObjArray = INITIAL_CHAT_LOG
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
    
      <ComposeForm />
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