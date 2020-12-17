import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import MessagePanelContent from "../message-panel-content";

import { TChannel, TDatabaseRef, TDatabaseSnapshot, TMessage } from "../../../types/reused-types";

import './message-panel-contents.scss';
import '../../../assets/styles/scrollbar.scss';


type TMessagePanelContents = {
  currentActiveChannel: TChannel
  logInUser: any
  messageRef: TDatabaseRef
  scrollEndPage: boolean
  setScrollEndPage: (state: boolean) => void
}

const MessagePanelContents: React.FC<TMessagePanelContents> = ({ currentActiveChannel, logInUser, messageRef, scrollEndPage, setScrollEndPage }: TMessagePanelContents) => {
  const messagePanelContent = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Array<TMessage>>([]);
  const [idFirstMessage, setIdFirstMessage] = useState<string>('');
  const [flag, setFlag] = useState(false);

  const getMessagesById = useCallback((channelId: string) => {
    setMessages([]);
    setScrollEndPage(true);
    setFlag(true);

    messageRef
      .child(channelId)
      .orderByChild('id')
      .limitToLast(20)
      .on("child_added", (snap: TDatabaseSnapshot) => {
        setMessages((prevState) => [...prevState, snap.val()]);
      });

  }, [messageRef, setScrollEndPage]);

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

    if (scrollEndPage && messageContent) {
      messageContent.scrollTop = messageContent.scrollHeight;
    }
  }, [scrollEndPage])

  useEffect(() => {
    scrollItemWhenNewData();
    setFlag(true);
    setIdFirstMessage(messages[0]?.id);
    return () => {
      messageRef.off()
    };
  }, [messages, messageRef, scrollItemWhenNewData]);

  const savePrevMessages = useCallback((dataSnaphop: TDatabaseSnapshot) => {
    const array: Array<TMessage> = [];
    setScrollEndPage(false);
    dataSnaphop.forEach((item) => { array.push(item.val()) });
    array.pop();
    setMessages((prevState) => [...array, ...prevState]);
  }, [setScrollEndPage])

  const getPrevMessages = useCallback((channelId: string) => {
    messageRef
      .child(channelId)
      .orderByChild('id')
      .limitToLast(20)
      .endAt(idFirstMessage)
      .once('value')
      .then(savePrevMessages)
  }, [idFirstMessage, messageRef, savePrevMessages]);

  const scrollTop = useCallback(() => {
    const messageContent = messagePanelContent.current;
    const scroll = messageContent?.scrollTop;

    if (flag && (scroll! < 250)) {
      getPrevMessages(currentActiveChannel.id)
      setFlag(false);
      return false;
    }

  }, [currentActiveChannel, flag, getPrevMessages])

  // Вешает событие скролла на элемент и удаляет его
  useEffect(() => {
    const messageContent = messagePanelContent.current;
    messageContent?.addEventListener('scroll', scrollTop)
    return () => {
      messageContent?.removeEventListener('scroll', scrollTop)
    }
  }, [scrollTop]);

  const scroll = flag ? 'auto' : 'hidden';

  return (
    <div className="message-panel-contents scrollbar-style" style={{ overflowY: scroll }} ref={messagePanelContent}>
      <div className="message-panel-contents__wrapper">
        {
          messages.map((message: TMessage) => {
            const { id } = message;
            return <MessagePanelContent key={id} message={message} />
          })
        }
      </div>
    </div>
  );
}

export default memo(MessagePanelContents);
