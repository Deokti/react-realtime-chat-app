import React from "react";

import Button from "../../button";

import './message-panel-preview.scss';
import Spinner from "../../spinner";

type TMessagePanelPreview = {
  previewImage: null | string
  closeModal: () => void
  onSendFile: () => void
  sendLoadFile: boolean
}

const MessagePanelPreview: React.FC<TMessagePanelPreview> = ({ previewImage, closeModal, onSendFile, sendLoadFile }: TMessagePanelPreview) => {

  const onClickButton = (event: React.FormEvent) => {
    event.preventDefault();
    onSendFile();
  }

  return (
    <div className="message-panel-modal">
      <form className="message-panel-modal__wrapper">

        {sendLoadFile
          ? <Spinner position="static" text="Файл отправляется..." backgroundColor="transparent" />
          : (<React.Fragment>
            <div className="message-panel-modal__header">
              <img src={previewImage ? previewImage : ''} alt="Изображение" />
            </div>

            <div className="message-panel-modal__buttons">
              <Button className="message-panel-modal__button message-panel-modal__button--close"
                      disabled={sendLoadFile}
                      onClick={closeModal}>Отмена</Button>
              <Button
                className="message-panel-modal__button message-panel-modal__button--send"
                disabled={sendLoadFile}
                onClick={onClickButton}>Отправить</Button>
            </div>
          </React.Fragment>)}

      </form>
    </div>
  );
};

export default MessagePanelPreview;
