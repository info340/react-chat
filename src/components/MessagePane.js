import DEFAULT_CHAT_LOG from '../data/chat_log.json'

import { ComposeForm } from './ComposeForm.js'

export function MessagePane(props) {

  const messageElemArray = DEFAULT_CHAT_LOG.map((msgObj) => {
    const transformed = (
      <MessageItem messageData={msgObj} key={msgObj.timestamp} />
    )
    return transformed
  })


  return (
    <div>
      {messageElemArray}
    
      <ComposeForm />
    </div>
  )
}

function MessageItem(props) {
  const messageData = props.messageData;
  const {userName, text, userImg} = messageData; //destructuring

  return (
    <div className="message m-2">
      <div className="d-flex">
        <img className="me-1" src={userImg} alt="Eagle's avatar picture" />
        <p><strong>{userName}</strong></p>
      </div>
      <p>{text}</p>
    </div>
  )
}