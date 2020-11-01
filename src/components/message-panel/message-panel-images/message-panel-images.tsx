import React, { useState } from 'react';
import { PaperclipIcon } from "../../icon";
import MessagePanelPreview from "../message-panel-preview/message-panel-preview";

import { v4 as uuidv4 } from 'uuid';
import { storage } from "../../../config/firebase";

import './message-panel-images.scss';

type TMessagePanelImages = {
  changeMediaURLFile: (url: string) => void
  message: string
  changeMessage: (value: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const MessagePanelImages: React.FC<TMessagePanelImages> = ({ changeMediaURLFile, message, changeMessage }: TMessagePanelImages) => {
  const [ addingSelectedMedia, setAddingSelectedMedia ] = useState<File | null>(null);
  const [ pathSelectedMedia, setPathSelectedMedia ] = useState<string>('');
  const [ previewImage, setPreviewImage ] = useState<any>('');
  const [ sendLoadFile, setSendLoadFile ] = useState<boolean>(false);

  const setCurrentMedia = (getFile: null | File, valueFile: string) => {
    setAddingSelectedMedia(getFile);
    setPathSelectedMedia(valueFile);
  }

  const getUrlImage = (file: null | File) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = function () {
        setPreviewImage(this.result as string)
      }
      reader.readAsDataURL(file);
    }
  }

  const closeModal = () => {
    setPreviewImage(null);
    setPathSelectedMedia('');
  };

  const addFileInState = (file: React.ChangeEvent<HTMLInputElement>) => {
    const getFile = file.target.files && file.target.files[0];

    setCurrentMedia(getFile, file.target.value);
    getUrlImage(getFile);
  }

  const onSendFile = async () => {
    await sendFileToStorage();
  }

  const isValidTypesFile = (type: null | string | undefined) => {
    if (type) return [ 'image/png', 'image/jpeg' ].includes(type)
  };

  const sendFileToStorage = async () => {
    if (addingSelectedMedia && isValidTypesFile(addingSelectedMedia?.type)) {
      setSendLoadFile(true);
      const ref = storage.ref();
      const pathStorageInPublicChannel = `/channels/public/${uuidv4()}`;


      const fileRef = ref.child(pathStorageInPublicChannel)

      await fileRef.put(addingSelectedMedia)
      const getFileUrl = await fileRef.getDownloadURL();

      await changeMediaURLFile(getFileUrl);
      await setSendLoadFile(false);
      await closeModal();
    }
  }


  return (
    <React.Fragment>
      {previewImage
        ? <MessagePanelPreview
          message={message}
          changeMessage={changeMessage}
          previewImage={previewImage}
          closeModal={closeModal}
          sendLoadFile={sendLoadFile}
          onSendFile={onSendFile} />
        : null}

      <form className='message-panel-image__form'>
        <label className="message-panel-image" title="Добавить изображение">
          <PaperclipIcon />
          <input
            type="file"
            className="message-panel-image__file"
            value={pathSelectedMedia}
            onChange={addFileInState} />
        </label>
      </form>
    </React.Fragment>
  )
};

export default MessagePanelImages;
