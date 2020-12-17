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
  setScrollEndPage: (state: boolean) => void
}

const MessagePanelForm: React.FC<TMessagePanelForm> = ({ logInUser, currentActiveChannel, messageRef, setScrollEndPage }: TMessagePanelForm) => {

  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handlerTextareaChang = useCallback((event: React.FormEvent<HTMLInputElement>): void => {
    setMessage(event.currentTarget.value);
  }, [])

  // Записывает вводимое в input значение в состояние
  const changeMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.currentTarget.value);
  }

  // Создаём время и проверяет его на if < 10 + 0
  const createTime = (): string => {
    const date = new Date();
    return `${lessTenAddZero(date.getHours())}:${lessTenAddZero(date.getMinutes())}`;
  }

  // Структура одного сообщения
  const createMessage = useCallback((messageContent: string, fileMessageURL: string = ''): TMessage => {
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
  }, [logInUser])

  // Отправка сообщения, которое сохраняется под идентификатором чата
  const sendMessage = useCallback((message: string, mediaURL: string = '') => {

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
          setScrollEndPage(true);
          setMessage('');
        })
    }
  }, [createMessage, currentActiveChannel, messageRef, setScrollEndPage]);

  const changeMediaURLFile = useCallback((url: string): void => {
    sendMessage(message, url);
  }, [message, sendMessage])


  const onSubmitForm = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();

    await sendMessage(message);
  }, [message, sendMessage])

  return (
    <div className="message-panel-form">
      <div className="message-panel-form__add-file">
        <MessagePanelImages
          changeMediaURLFile={changeMediaURLFile}
          message={message}
          changeMessage={changeMessage}
        />
      </div>
      <form className="message-panel-form__form" onSubmit={onSubmitForm}>
        <label className={`message-panel-form__label ${message.length > 0 ? 'message-panel-form__write' : ''}`}>
          <input
            className="message-panel-form__input"
            onChange={handlerTextareaChang}
            value={message}
          />
          <span className="message-panel-form__placeholder">Написать сообщение...</span>
        </label>
        <Button className="message-panel-form__send" loading={loading} disabled={loading} onClick={onSubmitForm}>
          <SendMessageIcon />
        </Button>
      </form>
    </div>
  )
};

export default memo(MessagePanelForm);
