import React, { useState } from 'react';

export function ComposeForm(props){
  const { addMessageFunction } = props;

  const [typedInput, setTypedInput] = useState('');

  //user sending the message (hard-coded for now)
  const userObj = { userId: "parrot", userName: "Parrot", userImg: "/img/Parrot.png" }

  const handleChange = (event) => {
    setTypedInput(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form submitted");

    //add the messsage!
    addMessageFunction(userObj, typedInput)

    setTypedInput('');
  }

  return (
    <form className="my-2" onSubmit={handleSubmit}>
      <div className="input-group">
        <img src={userObj.userImg} alt={userObj.userName + " avatar"} />
        <textarea className="form-control" rows="2" 
        placeholder="Type a new message"
        value={typedInput}
        onChange={handleChange}
        ></textarea>
        <button className="btn btn-secondary" type="submit">
          <span className="material-icons">send</span>
        </button>
      </div>
    </form>
  );
}