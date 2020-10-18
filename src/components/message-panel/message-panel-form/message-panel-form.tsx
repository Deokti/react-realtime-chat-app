import React, { useCallback, useState } from "react";
import Button from "../../button";
import { PaperclipIcon, SendMessageIcon } from "../../icon";

import { TMessage } from "../message-panel-contents/message-panel-contents";

import { TChannel } from "../../channels-panel/channels-panel";

import './message-panel-form.scss';

type TMessagePanelForm = {
  logInUser: any
  currentActiveChannel: TChannel
  messageRef: any
}

const MessagePanelForm: React.FC<TMessagePanelForm> = ({ logInUser, currentActiveChannel, messageRef }: TMessagePanelForm) => {

  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handlerTextareaChang = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setMessage(event.currentTarget.value);
  }, [])

  const createTime = () => {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}`;
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
          <PaperclipIcon />
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

export default MessagePanelForm;
