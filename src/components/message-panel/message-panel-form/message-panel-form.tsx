import React, { memo, useCallback, useState } from "react";
import Button from "../../button";
import lessTenAddZero from "../../../utils/less-ten-add-zero";
import MessagePanelImages from "../message-panel-images";
import { SendMessageIcon } from "../../icon";

import { TChannel, TDatabaseRef, TMessage } from "../../../types/reused-types";

import './message-panel-form.scss';

type TMessagePanelForm = {
  logInUser: any
  currentActiveChannel: TChannel
  messageRef: TDatabaseRef
}

const MessagePanelForm: React.FC<TMessagePanelForm> = ({ logInUser, currentActiveChannel, messageRef }: TMessagePanelForm) => {

  const [ message, setMessage ] = useState<string>('');
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ mediaURLFile, setMediaURLFile ] = useState<string>('');

  const handlerTextareaChang = useCallback((event: React.FormEvent<HTMLInputElement>): void => {
    setMessage(event.currentTarget.value);
  }, [])

  const changeMediaURLFile = (url: string): void => {
    setMediaURLFile(url);
    sendMessage(message, url);
  }

  const createTime = (): string => {
    const date = new Date();
    return `${lessTenAddZero(date.getHours())}:${lessTenAddZero(date.getMinutes())}`;
  }
  const createMessage = (messageContent: string, fileMessageURL: string = ''): TMessage => {
    return {
      id: Date.now().toString(),
      time: createTime(),
      messageContent: messageContent,
      fileMessageURL: fileMessageURL,
      authorMessage: {
        username: (logInUser && logInUser.displayName),
        avatar: (logInUser && logInUser.photoURL),
        id: (logInUser && logInUser.uid)
      }
    }
  }

  const onSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    await sendMessage(message);
  };

  const sendMessage = (message: string, mediaURL: string = '') => {

    // Сохранение происходит под идентификаторов текущего выбранного чата
    // Затем создаётся любой айдишник для сообщения
    // После мы уже устанавливаем его и отправляем
    if (message.trim().length || mediaURL) {
      setLoading(true);
      const { id: channelId } = currentActiveChannel;
      messageRef
        .child(channelId)
        .push()
        .set(createMessage(message.trim(), mediaURL))
        .then(() => {
          console.log('Сообщение отправлено в базу данных');
          setLoading(false);
          setMessage('');
          setMediaURLFile('');
        })
    }
  }

  return (
    <div className="message-panel-form">
      <div className="message-panel-form__add-file">
        <MessagePanelImages changeMediaURLFile={changeMediaURLFile} />
      </div>
      <form className="message-panel-form__form" onSubmit={onSubmitForm}>
        <input
          placeholder="Написать сообщение..."
          className="message-panel-form__input"
          onChange={handlerTextareaChang}
          value={message}
        />
        <Button className="message-panel-form__send" loading={loading} disabled={loading} onClick={onSubmitForm}>
          <SendMessageIcon />
        </Button>
      </form>
    </div>
  )
};

export default memo(MessagePanelForm);
