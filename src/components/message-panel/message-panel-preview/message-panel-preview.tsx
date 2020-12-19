import React, { memo } from "react";

import Button from "../../button";
import Spinner from "../../spinner";

import { connect } from "react-redux";
import { changeMessage } from '../../../actions';

import './message-panel-preview.scss';
import '../../../assets/styles/scrollbar.scss';
import { TCommunication } from "../../../types/redux";

type MessagePanelPreview = {
  previewImage: null | string
  closeModal: () => void
  onSendFile: () => void
  sendLoadFile: boolean
  message: string
  changeMessage: (message: string) => void
  imageCompress: boolean
}

const MessagePanelPreview: React.FC<MessagePanelPreview> = (
  { previewImage, closeModal, onSendFile, sendLoadFile, message, changeMessage, imageCompress }: MessagePanelPreview) => {

  const handlerTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    changeMessage(event.currentTarget.value);
  }

  return (
    <div className="message-panel-modal">
      <div className="message-panel-modal__wrapper">

        {sendLoadFile
          ? <Spinner position="static" text={imageCompress ? 'Сжатие изображения...' : 'Файл отправляется...'} backgroundColor="transparent" />
          : (
            <React.Fragment>
              <div className="message-panel-modal__header">
                <img src={previewImage ? previewImage : ''} alt="Изображение" />
              </div>

              <div className="message-panel-modal__description">
                <label className="message-panel-modal__label">
                  <h4 className="message-panel-modal__title">Подпись</h4>
                  <textarea
                    value={message}
                    onChange={handlerTextareaChange}
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
          )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ communication: { message } }: { communication: TCommunication }) => {
  return { message }
}

export default memo(connect(mapStateToProps, { changeMessage })(MessagePanelPreview))