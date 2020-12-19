import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import MessagePanelContent from "../message-panel-content";

import { TChannel, TDatabaseRef, TDatabaseSnapshot, TMessage } from "../../../types/reused-types";

import './message-panel-contents.scss';
import '../../../assets/styles/scrollbar.scss';


type TMessagePanelContents = {
  activeChannel: TChannel
  logInUser: any
  messageRef: TDatabaseRef
  scrollEndPage: boolean
  setScrollEndPage: (state: boolean) => void
}

const MessagePanelContents: React.FC<TMessagePanelContents> = ({ activeChannel, logInUser, messageRef, scrollEndPage, setScrollEndPage }: TMessagePanelContents) => {
  const messagePanelContent = useRef<HTMLDivElement>(null);
  const messageWrapperRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Array<TMessage>>([]);
  const [idFirstMessage, setIdFirstMessage] = useState<string>('');
  const [loadedPrevMessages, setLoadedPrevMessages] = useState<boolean>(false);

  const getMessagesById = useCallback((channelId: string) => {
    setMessages([]);
    setScrollEndPage(true);

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
    let isMounted = true;
    if (activeChannel && logInUser) {
      if (isMounted) getDataDatabase(activeChannel.id);
    }

    return () => {
      messageRef.off();
      isMounted = false;
    };
  }, [activeChannel, getDataDatabase, logInUser, messageRef]);

  const scrollItemWhenNewData = useCallback(() => {
    const messageContent = messagePanelContent.current;

    if (scrollEndPage && messageContent) {
      messageContent.scrollTop = messageContent.scrollHeight;
    }
  }, [scrollEndPage])

  useEffect(() => {
    scrollItemWhenNewData();
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

  const restorePreviousScrollPosition = (messageContent: HTMLDivElement | null, firstMessage: HTMLElement | null) => {
    messageContent!.scrollTop = firstMessage!.offsetTop - 10;
    setLoadedPrevMessages(false);
  }

  const getPrevMessages = useCallback((channelId: string) => {
    setLoadedPrevMessages(true);
    const messageContent = messagePanelContent.current;
    const firstMessage = messageWrapperRef.current?.firstElementChild as HTMLElement

    messageRef
      .child(channelId)
      .orderByChild('id')
      .limitToLast(20)
      .endAt(idFirstMessage)
      .once('value')
      .then(savePrevMessages)
      .then(() => restorePreviousScrollPosition(messageContent, firstMessage))
  }, [idFirstMessage, messageRef, savePrevMessages]);

  const scrollTop = useCallback(() => {
    const messageContent = messagePanelContent.current;
    const scroll = messageContent?.scrollTop;

    if (scroll === 0) {
      getPrevMessages(activeChannel.id)
      return false;
    }

  }, [activeChannel, getPrevMessages])

  // Вешает событие скролла на элемент и удаляет его
  useEffect(() => {
    const messageContent = messagePanelContent.current;
    messageContent?.addEventListener('scroll', scrollTop)
    return () => {
      messageContent?.removeEventListener('scroll', scrollTop)
    }
  }, [scrollTop]);


  return (
    <div className="message-panel-contents scrollbar-style" ref={messagePanelContent}>
      {loadedPrevMessages && <span className="loaded-prev-messages" />}
      <div className="message-panel-contents__wrapper" ref={messageWrapperRef}>
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
