import React from "react";

import { connect } from "react-redux";
import { TMapStateCurrentUser } from "../../control-panel/control-panel";

import './message-panel-content.scss';
import { TMessage } from "../../../types/reused-types";

type TMessagePanelContent = {
  message: TMessage
  logInUser: any
}

const MessagePanelContent: React.FC<TMessagePanelContent> = ({ message, logInUser }: TMessagePanelContent) => {
  const { authorMessage, messageContent, time } = message;

  const activeUser = authorMessage.id === (logInUser && logInUser.uid)
    ? 'message-panel-content-active'
    : '';

  return (
    <div className="message-panel-content">
      <div className="message-panel-content__avatar">
        <img src={authorMessage.avatar} alt="Аватар" className="message-panel-content__img" />
      </div>

      <div className={`message-panel-content__item ${activeUser}`}>
        <h4 className="message-panel-content__author">{authorMessage.username}</h4>
        <p className="message-panel-content__message">{messageContent}</p>
        <span className="message-panel-content__time">{time}</span>
      </div>
    </div>
  );
};

const mapStateToProps = ({ currentLoggedUser: { logInUser } }: TMapStateCurrentUser) => {
  return { logInUser }
}

export default connect(mapStateToProps)(MessagePanelContent);