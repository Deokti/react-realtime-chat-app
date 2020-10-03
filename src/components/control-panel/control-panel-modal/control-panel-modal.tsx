import React from "react";

import Input from "../../input";
import Button from "../../button";
import { database } from "../../../config/firebase";
import { withHandlerInput } from "../../HOC";


import './control-panel-modal.scss';

type TControlPanelModal = {
  input: { channelName: string }
  setInput: (state: { channelName: string }) => any
  whenChangingInput: (state: string) => void
  modal: boolean
  closeModal: () => void
  username: string
  userAvatar: string
}

const ControlPanelModal = ({ input, setInput, whenChangingInput, modal, closeModal, userAvatar, username }: TControlPanelModal) => {

  const onCloseModal = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    closeModal();
  }

  const isValidForm = (input: string) => input.trim().length > 0;

  const onHandlerSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isValidForm(input.channelName)) {
      const channelsRef = database.ref('CHANNELS');
      createChannel(channelsRef);
    }
  }

  const createChannel = (channelsRef: any) => {
    const id = channelsRef.push().key;

    const createNewChannel = {
      id,
      channelName: input.channelName,
      type: 'CHANNELS',
      channelCreator: {
        username,
        avatar: userAvatar,
      }
    }

    return channelsRef.child(id)
      .update(createNewChannel)
      .then(() => `Канал под названием ${createNewChannel.channelName} создан!`)
      .then(() => {
        setInput({ channelName: '' });
        closeModal();
      })
  }

  return modal && (
    <div className="control-panel-modal">
      <div className="control-panel-modal__window">
        <h4 className="control-panel-modal__title">Создать новый канал</h4>

        <form className="control-panel-modal__form" onSubmit={onHandlerSubmit}>
          <Input
            label="Название канала"
            name="channelName"
            value={input.channelName}
            className="control-panel-modal-input"
            onChange={whenChangingInput} />

          <div className="control-panel-modal__buttons">
              <Button className="control-panel-modal__button control-panel-modal__cancel" onClick={onCloseModal}>Отменить</Button>
              <Button className="control-panel-modal__button control-panel-modal__submit" onClick={onHandlerSubmit}>Создать</Button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default withHandlerInput({ channelName: '' })(ControlPanelModal);