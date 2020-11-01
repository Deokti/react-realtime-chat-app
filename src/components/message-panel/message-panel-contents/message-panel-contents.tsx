import React, { useCallback, useEffect, useRef, useState } from "react";
import MessagePanelContent from "../message-panel-content";

import { TChannel, TDatabaseRef, TDatabaseSnapshot, TMessage } from "../../../types/reused-types";

import './message-panel-contents.scss';
import '../../../assets/styles/scrollbar.scss';

// Что нужно сделать!
// 1. Создать функцию, где мы получим все данные с сервера и сохранив их в массив.
// 2. Когда сохранение будет завершено, мы передадим все данные массива в состояние
// 3. Когда состояние получит сразу все данные, мы создадим для него разметку

type TMessagePanelContents = {
  currentActiveChannel: TChannel
  logInUser: any
  messageRef: TDatabaseRef
}

const MessagePanelContents: React.FC<TMessagePanelContents> = ({ currentActiveChannel, logInUser, messageRef }: TMessagePanelContents) => {
  const messagePanelContent = useRef<HTMLDivElement>(null);
  const [ messages, setMessages ] = useState<Array<TMessage>>([]);


  const getMessagesById = useCallback((channelId: string) => {
    setMessages([]);
    messageRef.child(channelId).on("child_added", (snapshot: TDatabaseSnapshot) => {
      setMessages((prevState) => [...prevState, snapshot.val()]);
    });
  }, [messageRef])

  const getDataDatabase = useCallback((channelId: string) => {
    getMessagesById(channelId);
  }, [ getMessagesById ])

  useEffect(() => {
    if (currentActiveChannel && logInUser) {
      getDataDatabase(currentActiveChannel.id);
    }
    return () => {
      messageRef.off();
    }
  }, [currentActiveChannel, getDataDatabase, logInUser, messageRef]);

  useEffect(() => {
    scrollItemWhenNewData();

    return () => {
      messageRef.off();
    }
  }, [ messageRef, messages, setMessages ])

  const scrollItemWhenNewData = () => {
    const messageContent = messagePanelContent.current;

    if (messageContent) {
      messageContent.scrollTop = messageContent.scrollHeight;
    }
  }

  const createTemplateMessage = () => {
    return (
      <div className="message-panel-contents__wrapper">
        {messages.map((message: TMessage) => {
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

export default MessagePanelContents;
