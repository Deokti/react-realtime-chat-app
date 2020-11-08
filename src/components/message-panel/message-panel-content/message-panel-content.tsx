import React, { useState } from "react";
import MessagePanelFullpage from "../message-panel-fullpage";

import { connect } from "react-redux";
import { TMapStateCurrentUser } from "../../control-panel/control-panel";

import { TMessage } from "../../../types/reused-types";

import './message-panel-content.scss';

type TMessagePanelContent = {
  message: TMessage
  logInUser: any
}

const MessagePanelContent: React.FC<TMessagePanelContent> = ({ message, logInUser }: TMessagePanelContent) => {
  const { authorMessage, messageContent, time, fileMessageURL } = message;
  const [ fullpageImage, setFullpageImage ] = useState<boolean>(false);

  const activeUser = authorMessage.id === (logInUser && logInUser.uid)
    ? 'message-panel-content-active'
    : '';

  const closeFullpageImage = () => setFullpageImage(false);

  return (
    <div className={`message-panel-content ${fileMessageURL ? 'message-panel-content-image' : ''}`}>
      <div className="message-panel-content__avatar">
        <img src={authorMessage.avatar} alt="Аватар" className="message-panel-content__img" />
      </div>

      <div className={`message-panel-content__item ${activeUser}`}>
        <h4 className="message-panel-content__author">{authorMessage.username}</h4>
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

const mapStateToProps = ({ currentLoggedUser: { logInUser } }: TMapStateCurrentUser) => {
  return { logInUser }
}

export default connect(mapStateToProps)(MessagePanelContent);
