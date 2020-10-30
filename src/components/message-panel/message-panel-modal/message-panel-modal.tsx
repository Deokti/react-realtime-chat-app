import React, { useCallback, useEffect, useRef } from "react";

import Button from "../../button";
import { connect } from "react-redux";
import { currentSelectedImage } from '../../../actions'

import './message-panel-modal.scss';

type TMessagePanelModal = {
  previewImage: null | string
  currentSelectedImage: (image: string | null) => any
}

const MessagePanelModal: React.FC<TMessagePanelModal> = ({ previewImage, currentSelectedImage }: TMessagePanelModal) => {
  const messageModalRef = useRef<HTMLDivElement>(null);

  const closeModal = useCallback(() => currentSelectedImage(null), [ currentSelectedImage ]);

  // Если произошёл клик не по элементу, то активируется функция и закроет окно
  const onClickNotMessageModal = useCallback((event: any) => {
    if (event.path && !event.path.includes(messageModalRef.current)) {
      closeModal();
    }
  }, [ closeModal ]);

  useEffect(() => {
    document.body.addEventListener('click', onClickNotMessageModal);
    return () => document.body.removeEventListener('click', onClickNotMessageModal);
  }, [ onClickNotMessageModal ]);


  return (
    <div className="message-panel-modal" ref={messageModalRef}>
      <div className="message-panel-modal__wrapper">
        <div className="message-panel-modal__header">
          <img src={previewImage ? previewImage : ''} alt="Изображение" />
        </div>

        <div className="message-panel-modal__buttons">
          <Button className="message-panel-modal__button message-panel-modal__button--close"
                  onClick={closeModal}>Отмена</Button>
          <Button className="message-panel-modal__button message-panel-modal__button--send">Отправить</Button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { currentSelectedImage })(MessagePanelModal);
