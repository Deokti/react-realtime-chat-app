import React, { memo, useCallback, useState } from "react";
import Button from "../../button";
import lessTenAddZero from "../../../utils/less-ten-add-zero";
import MessagePanelImages from "../message-panel-images";
import { SendMessageIcon } from "../../icon";

import { TChannel, TDatabaseRef, TMessage } from "../../../types/reused-types";

import './message-panel-form.scss';
import MessagePanelModal from "../message-panel-modal";

type TMessagePanelForm = {
  logInUser: any
  currentActiveChannel: TChannel
  messageRef: TDatabaseRef
}

const MessagePanelForm: React.FC<TMessagePanelForm> = ({ logInUser, currentActiveChannel, messageRef }: TMessagePanelForm) => {

  const [ message, setMessage ] = useState<string>('');
  const [ loading, setLoading ] = useState<boolean>(false);

  const handlerTextareaChang = useCallback((event: React.FormEvent<HTMLInputElement>): void => {
    setMessage(event.currentTarget.value);
  }, [])

  const createTime = (): string => {
    const date = new Date();
    return `${lessTenAddZero(date.getHours())}:${lessTenAddZero(date.getMinutes())}`;
  }
  const createMessage = (): TMessage => {
    return {
      id: Date.now().toString(),
      time: createTime(),
      messageContent: message.trim(),
      authorMessage: {
        username: (logInUser && logInUser.displayName),
        avatar: (logInUser && logInUser.photoURL),
        id: (logInUser && logInUser.uid)
      }
    }
  }

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();

    // Сохранение происходит под идентификаторов текущего выбранного чата
    // Затем создаётся любой айдишник для сообщения
    // После мы уже устанавливаем его и отправляем
    if (message.trim()) {
      setLoading(true);
      const { id: channelId } = currentActiveChannel;
      messageRef
        .child(channelId)
        .push()
        .set(createMessage())
        .then(() => {
          console.log('Сообщение отправлено в базу данных');
          setLoading(false);
          setMessage('');
        })
    }
  };

  return (
    <div className="message-panel-form">
      <div className="message-panel-form__add-file">
        <MessagePanelImages />
      </div>
      <form className="message-panel-form__form" onSubmit={sendMessage}>
        <input
          placeholder="Написать сообщение..."
          className="message-panel-form__input"
          onChange={handlerTextareaChang}
          value={message}
        />
        <Button className="message-panel-form__send" loading={loading} disabled={loading}>
          <SendMessageIcon />
        </Button>
      </form>
    </div>
  )
};

export default memo(MessagePanelForm);
