import React from "react";

import Button from "../../button";
import Spinner from "../../spinner";

import './message-panel-preview.scss';
import '../../../assets/styles/scrollbar.scss';

type TMessagePanelPreview = {
  previewImage: null | string
  closeModal: () => void
  onSendFile: () => void
  sendLoadFile: boolean
  message: string
  changeMessage: (value: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const MessagePanelPreview: React.FC<TMessagePanelPreview> = ({ previewImage, closeModal, onSendFile, sendLoadFile, message, changeMessage }: TMessagePanelPreview) => {

  return (
    <div className="message-panel-modal">
      <div className="message-panel-modal__wrapper">

        {sendLoadFile
          ? <Spinner position="static" text="Файл отправляется..." backgroundColor="transparent" />
          : <MessagePanelPreviewTemplate
            message={message}
            changeMessage={changeMessage}
            previewImage={previewImage}
            sendLoadFile={sendLoadFile}
            closeModal={closeModal}
            onSendFile={onSendFile} />
        }

      </div>
    </div>
  );
};

const MessagePanelPreviewTemplate: React.FC<TMessagePanelPreview> = ({ previewImage, sendLoadFile, closeModal, onSendFile, message, changeMessage }: TMessagePanelPreview) => {

  return (
    <React.Fragment>
      <div className="message-panel-modal__header">
        <img src={previewImage ? previewImage : ''} alt="Изображение" />
      </div>

      <div className="message-panel-modal__description">
        <label className="message-panel-modal__label">
          <h4 className="message-panel-modal__title">Подпись</h4>
          <textarea
            value={message}
            onChange={changeMessage}
            className="message-panel-modal__textarea scrollbar-style" />
        </label>
      </div>

      <div className="message-panel-modal__buttons">
        <Button className="message-panel-modal__button message-panel-modal__button--close"
                disabled={sendLoadFile}
                onClick={closeModal}>Отмена</Button>
        <Button
          className="message-panel-modal__button message-panel-modal__button--send"
          disabled={sendLoadFile}
          onClick={onSendFile}>Отправить</Button>
      </div>
    </React.Fragment>
  )
}

export default MessagePanelPreview;
