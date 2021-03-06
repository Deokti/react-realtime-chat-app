import React, { memo, useCallback, useState } from "react";
import Button from "../../button";
import MessagePanelImages from "../message-panel-images";
import { SendMessageIcon } from "../../icon";
import { changeMessage, sendingMessage, setPasteImage, setPreviewImage, setPathSelectedMedia } from '../../../actions';
import { TChannel, TDatabaseRef, TMessage } from "../../../types";

import { TUser } from "../../../types/redux";
import { connect } from "react-redux";

import { timeWhenMessageSent } from "../../../utils/create-message-time";

import './message-panel-form.scss';
import { TCommunication } from "../../../types/redux-state";

type TMessagePanelForm = {
  logInUser: TUser | null
  activeChannel: TChannel
  messageRef: TDatabaseRef
  setScrollEndPage: (state: boolean) => void
  communication: TCommunication
  changeMessage: (message: string) => void
  sendingMessage: (load: boolean) => void
  setPasteImage: (url: string) => void
  setPreviewImage: (url: string | null) => void
  setPathSelectedMedia: (path: string) => void
}

const MessagePanelForm: React.FC<TMessagePanelForm> = (
  { logInUser, activeChannel, messageRef, setScrollEndPage,
    communication, changeMessage, sendingMessage, setPasteImage,
    setPreviewImage, setPathSelectedMedia
  }: TMessagePanelForm) => {

  const [addingSelectedMedia, setAddingSelectedMedia] = useState<File | null>(null);
  const [sendLoadFile, setSendLoadFile] = useState<boolean>(false);

  const handlerTextareaChang = useCallback((event: React.FormEvent<HTMLInputElement>): void => {
    changeMessage(event.currentTarget.value)
  }, [changeMessage])

  // Структура одного сообщения
  const createMessage = useCallback((messageContent: string, fileMessageURL: string = ''): TMessage => {
    return {
      id: Date.now().toString(),
      time: timeWhenMessageSent(),
      messageContent: messageContent,
      fileMessageURL: fileMessageURL,
      authorMessage: {
        username: (logInUser && logInUser.username) as string,
        avatar: (logInUser && logInUser.avatar) as string,
        id: (logInUser && logInUser.id) as string
      }
    }
  }, [logInUser]);

  const resetState = useCallback(() => {
    console.log('Сообщение отправлено в базу данных');
    sendingMessage(false);
    setScrollEndPage(true);
    changeMessage('')
    setPreviewImage(null);
    setPasteImage('');
    setPathSelectedMedia('');
  }, [changeMessage, sendingMessage, setPasteImage, setPathSelectedMedia, setPreviewImage, setScrollEndPage]);

  // Отправка сообщения, которое сохраняется под идентификатором чата
  const sendMessage = useCallback((message: string, mediaURL: string = '') => {

    if (message.trim().length || mediaURL) {
      sendingMessage(true);
      const { id: channelId } = activeChannel;
      messageRef
        .child(channelId)
        .push()
        .set(createMessage(message.trim(), mediaURL))
        .then(resetState)
    }
  }, [sendingMessage, activeChannel, messageRef, createMessage, resetState]);

  const changeMediaURLFile = useCallback((url: string): void => {
    sendMessage(communication.message, url);
  }, [communication.message, sendMessage])

  const onSubmitForm = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();

    await sendMessage(communication.message);
  }, [communication.message, sendMessage])


  const onPasteImage = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const div = document.createElement('div');
    div.innerHTML = event.clipboardData.getData('text/html');
    const getUrl = div.querySelector('img')?.src;

    if (/^(ftp|http|https):\/\/[^ "]+$/.test(getUrl as string)) {
      setPasteImage(getUrl as string);
      setPathSelectedMedia(getUrl as string)
      setPreviewImage(getUrl as string)
    }
  }

  return (
    <div className="message-panel-form">
      <div className="message-panel-form__add-file">
        <MessagePanelImages
          changeMediaURLFile={changeMediaURLFile}
          sendMessage={sendMessage}
          addingSelectedMedia={addingSelectedMedia}
          setAddingSelectedMedia={setAddingSelectedMedia}
          sendLoadFile={sendLoadFile}
          setSendLoadFile={setSendLoadFile}
        />
      </div>
      <form className="message-panel-form__form" onSubmit={onSubmitForm}>
        <label className={`message-panel-form__label ${communication.message.length > 0 ? 'message-panel-form__write' : ''}`}>
          <input
            className="message-panel-form__input"
            onPaste={onPasteImage}
            onChange={handlerTextareaChang}
            value={communication.message}
          />
          <span className="message-panel-form__placeholder">Написать сообщение...</span>
        </label>

        <Button
          className="message-panel-form__send"
          loading={communication.loading}
          disabled={communication.loading}
          onClick={onSubmitForm}
        >
          <SendMessageIcon />
        </Button>
      </form>
    </div>
  )
};

const mapStateToProps = ({ communication }: { communication: TCommunication }) => {
  return { communication }
}

export default memo(
  connect(mapStateToProps,
    { changeMessage, sendingMessage, setPasteImage, setPreviewImage, setPathSelectedMedia }
  )(MessagePanelForm));
