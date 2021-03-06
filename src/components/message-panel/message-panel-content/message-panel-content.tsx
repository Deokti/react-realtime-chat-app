import React, { useState } from "react";
import MessagePanelFullpage from "../message-panel-fullpage";

import { connect } from "react-redux";
import { TMessage } from "../../../types";
import { TAuth } from "../../../types/redux-state";

import './message-panel-content.scss';
import { TUser } from "../../../types/redux";

type TMessagePanelContent = {
  message: TMessage
  logInUser: TUser | null
}

const MessagePanelContent: React.FC<TMessagePanelContent> = ({ message, logInUser }: TMessagePanelContent) => {
  const { authorMessage, messageContent, time, fileMessageURL } = message;
  const [fullpageImage, setFullpageImage] = useState<boolean>(false);

  const activeUser = authorMessage.id === (logInUser && logInUser.id)
    ? 'message-panel-content-active'
    : '';

  const closeFullpageImage = () => setFullpageImage(false);

  return (
    <div className={`message-panel-content ${fileMessageURL ? 'message-panel-content-image' : ''}`}>
      <div className="message-panel-content__avatar">
        <img src={message && authorMessage.avatar} alt="Аватар" className="message-panel-content__img" />
      </div>

      <div className={`message-panel-content__item ${activeUser}`}>
        <h4 className="message-panel-content__author">{message && authorMessage.username}</h4>
        <div className="message-panel-content__message">
          {fileMessageURL
            ? (<React.Fragment>
              <img src={fileMessageURL} alt="файл"
                title="Открыть"
                className="message-panel-content__message-img"
                onClick={() => setFullpageImage(true)} />
              {fullpageImage && <MessagePanelFullpage imageURL={fileMessageURL} closeFullpageImage={closeFullpageImage} />}
            </React.Fragment>)
            : null}
          {messageContent
            ? <p className="message-panel-content__message-content">{messageContent}</p>
            : null}
        </div>
        <span className="message-panel-content__time">{time}</span>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth: { logInUser } }: TAuth) => {
  return { logInUser }
}

export default connect(mapStateToProps)(MessagePanelContent);
