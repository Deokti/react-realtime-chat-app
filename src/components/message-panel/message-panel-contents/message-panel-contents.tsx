import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import MessagePanelContent from "../message-panel-content";

import { TChannel, TDatabaseRef, TDatabaseSnapshot, TMessage } from "../../../types/reused-types";

import './message-panel-contents.scss';
import '../../../assets/styles/scrollbar.scss';


type TMessagePanelContents = {
  currentActiveChannel: TChannel
  logInUser: any
  messageRef: TDatabaseRef
}

const MessagePanelContents: React.FC<TMessagePanelContents> = ({ currentActiveChannel, logInUser, messageRef }: TMessagePanelContents) => {
  const messagePanelContent = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Array<TMessage>>([]);

  const writeDataInSetMessage = (data: TMessage) => {
    setMessages((prevState) => [...prevState, data]);
  }

  const getMessagesById = useCallback((channelId: string) => {
    setMessages([]);

    messageRef.child(channelId)
      .limitToLast(50)
      .on("child_added", (snap: TDatabaseSnapshot) => {
        writeDataInSetMessage(snap.val());
      })

  }, [messageRef]);

  const getDataDatabase = useCallback((channelId: string) => {

    getMessagesById(channelId)
  }, [getMessagesById])

  useEffect(() => {
    if (currentActiveChannel && logInUser) {
      getDataDatabase(currentActiveChannel.id);
    }

    return () => {
      messageRef.off();
    };
  }, [currentActiveChannel, getDataDatabase, logInUser, messageRef]);

  const scrollItemWhenNewData = useCallback(() => {
    const messageContent = messagePanelContent.current;

    if (messageContent) {
      messageContent.scrollTop = messageContent.scrollHeight;
    }
  }, [])

  useEffect(() => {
    scrollItemWhenNewData();

    return () => {
      messageRef.off()
    };
  }, [messages, messageRef, scrollItemWhenNewData]);

  const createTemplateMessage = () => {
    return (
      <div className="message-panel-contents__wrapper">
        {
          messages.map((message: TMessage) => {
            const { id } = message;
            return <MessagePanelContent key={id} message={message} />
          })
        }
      </div>
    )
  }

  return (
    <div className="message-panel-contents scrollbar-style" ref={messagePanelContent}>
      {createTemplateMessage()}
    </div>
  );
}

export default memo(MessagePanelContents);
