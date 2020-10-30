import React, { useCallback, useEffect, useRef, useState } from "react";
import MessagePanelContent from "../message-panel-content";

import { TChannel } from "../../channels-panel/channels-panel";

import './message-panel-contents.scss';
import { SpinnerLoader } from "../../icon";
import Spinner from "../../spinner";

export type TMessage = {
  id: string
  time: string
  messageContent: string
  authorMessage: {
    username: string
    avatar: string
    id: string
  }
}

type TMessagePanelContents = {
  currentActiveChannel: TChannel
  logInUser: any
  messageRef: any
}

const MessagePanelContents: React.FC<TMessagePanelContents> = ({ currentActiveChannel, logInUser, messageRef }: TMessagePanelContents) => {
  const messagePanelContent = useRef<HTMLDivElement>(null);
  const [ messages, setMessages ] = useState<Array<TMessage>>([]);
  const [ loadingMessages, setLoadingMessages ] = useState<boolean>(false);

  const getMessagesById = useCallback((channelId: string) => {
    messageRef.child(channelId).on("child_added", (snapshot: any) => {
      setMessages((prevState) => [ ...prevState, snapshot.val() ]);
      setLoadingMessages(false);
    });
  }, [ messageRef ])

  const getDataDatabase = useCallback((channelId: string) => {
    getMessagesById(channelId);
  }, [ getMessagesById ])

  useEffect(() => {
    if (currentActiveChannel && logInUser) {
      setLoadingMessages(true);
      getDataDatabase(currentActiveChannel.id)
    }
  }, [ currentActiveChannel, getDataDatabase, logInUser ]);

  useEffect(() => {
    scrollItemWhenNewData();
  }, [ messages, setMessages ])

  const scrollItemWhenNewData = () => {
    const messageContent = messagePanelContent.current;

    if (messageContent) {
      messageContent.scrollTop = messageContent.scrollHeight

    }
  }

  const createTemplateMessage = () => {
    return (
      <div className="message-panel-contents__wrapper">
        {messages.map((message: TMessage) => {
          const { id } = message;
          return (
            <MessagePanelContent key={id} message={message} />
          )
        })
        }
      </div>
    )
  }

  return (
    <div className="message-panel-contents" ref={messagePanelContent}>
      {
        loadingMessages ?
          <Spinner position="absolute" />
          : createTemplateMessage()
      }
    </div>
  );
}

export default MessagePanelContents;