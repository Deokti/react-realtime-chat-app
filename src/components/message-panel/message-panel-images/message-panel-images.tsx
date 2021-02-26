import React, { memo } from 'react';
import { PaperclipIcon } from "../../icon";
import MessagePanelPreview from "../message-panel-preview/message-panel-preview";

import { v4 as uuidv4 } from 'uuid';
import { storage } from "../../../config/firebase";
import { setPreviewImage, setPathSelectedMedia, setPasteImage, setUploadImageProgress, changeImageCompress } from '../../../actions';

import { connect } from 'react-redux';

import imageCompression from 'browser-image-compression';

import './message-panel-images.scss';
import { TCommunication } from '../../../types/redux-state';

type TMessagePanelImages = {
  communication: TCommunication
  changeMediaURLFile: (url: string) => void
  addingSelectedMedia: any
  sendMessage: (message: string, mediaURL: string) => void
  setAddingSelectedMedia: any
  setPathSelectedMedia: (path: string) => void
  setPreviewImage: (url: string | null) => void
  sendLoadFile: boolean
  setSendLoadFile: (state: boolean) => void
  setPasteImage: (paste: string) => void
  setUploadImageProgress: (progress: number) => void
  changeImageCompress: (state: boolean) => void
}

const MessagePanelImages: React.FC<TMessagePanelImages> = (
  { changeMediaURLFile, addingSelectedMedia, setAddingSelectedMedia,
    setPathSelectedMedia, sendMessage,
    setPasteImage, changeImageCompress, setUploadImageProgress,
    setPreviewImage, sendLoadFile, setSendLoadFile, communication
  }: TMessagePanelImages) => {

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
    setPreviewImage(null);
    setPasteImage('');
  };

  const addFileInState = async (file: React.ChangeEvent<HTMLInputElement>) => {
    const getFile = file.target.files && file.target.files[0];

    setCurrentMedia(getFile, file.target.value);
    getUrlImage(getFile);
  }

  const isValidTypesFile = (type: null | string | undefined) => {
    if (type) return ['image/png', 'image/jpeg', 'image/svg+xml'].includes(type)
  };

  const onProgress = (progress: number) => setUploadImageProgress(progress);

  const compressImage = async (getFile: File) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      onProgress: onProgress,
      useWebWorker: true
    }

    try {
      changeImageCompress(true);
      return await imageCompression(getFile!, options);
    } catch (error) {
      console.error(`Ошибки ${error} в функции addFileInState`);
    }
  }

  const uploadFile = async (compressed: Blob) => {
    const ref = storage.ref();
    const pathStorageInPublicChannel = `/channels/public/${uuidv4()}.jpg`;
    changeImageCompress(false);

    if (compressed) {
      const uploadFile = ref.child(pathStorageInPublicChannel).put(compressed);
      uploadFile
        .on('state_changed', upload => {
          const progress = Math.floor((upload.bytesTransferred / upload.totalBytes) * 100);
          onProgress(progress);
        }, null, async () => {
          const getURL = await uploadFile.snapshot.ref.getDownloadURL();
          changeMediaURLFile(getURL);
          setSendLoadFile(false);
          closeModal();
        });
    }
  }

  const sendFileToStorage = async () => {
    if (addingSelectedMedia && isValidTypesFile(addingSelectedMedia?.type)) {
      try {
        setSendLoadFile(true);
        const compressed = await compressImage(addingSelectedMedia);
        if (compressed) await uploadFile(compressed);
      } catch (error) {
        console.error(`Ошибки ${error} в функции sendFileToStorage`);
      }
    }
  }

  const onSendFile = async () => {
    if ((communication.pasteImage).trim().length > 0) {
      sendMessage(communication.message, communication.pasteImage);
      return false;
    }

    await sendFileToStorage();
  }

  return (
    <React.Fragment>
      {communication.previewImage
        ? <MessagePanelPreview
          previewImage={communication.previewImage}
          closeModal={closeModal}
          sendLoadFile={sendLoadFile}
          onSendFile={onSendFile} />
        : null}

      <form className='message-panel-image__form'>
        <label className="message-panel-image" title="Добавить изображение">
          <PaperclipIcon className="message-panel-image__paperclip" />
          <input
            type="file"
            className="message-panel-image__file"
            value=""
            onChange={addFileInState}
          />
        </label>
      </form>
    </React.Fragment>
  )
};

const mapStateToProps = ({ communication }: { communication: TCommunication }) => {
  return { communication }
}

export default memo(
  connect(
    mapStateToProps,
    {
      setPreviewImage,
      setPathSelectedMedia,
      setPasteImage,
      setUploadImageProgress,
      changeImageCompress
    })
    (MessagePanelImages)
);
