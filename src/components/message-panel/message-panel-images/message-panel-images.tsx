import React, { useState } from 'react';
import { PaperclipIcon } from "../../icon";

import { connect } from "react-redux";
import { currentSelectedImage } from '../../../actions'
import { TSelectedImageAction } from "../../../types/reused-types";

import './message-panel-images.scss';

type TMessagePanelImages = {
  currentSelectedImage: (image: string | null) => TSelectedImageAction;
}

const MessagePanelImages: React.FC<TMessagePanelImages> = ({ currentSelectedImage }: TMessagePanelImages) => {
  const [ addingSelectedMedia, setAddingSelectedMedia ] = useState<File | null>(null);
  const [ pathSelectedMedia, setPathSelectedMedia ] = useState<string>('');

  const setCurrentMedia = (getFile: null | File, valueFile: string) => {
    setAddingSelectedMedia(getFile);
    setPathSelectedMedia(valueFile);
  }

  const getUrlImage = (file: null | File) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = function () {
        currentSelectedImage(this.result as string);
      }
      reader.readAsDataURL(file);
      setPathSelectedMedia('');
    }
  }

  const addFileInState = (file: React.ChangeEvent<HTMLInputElement>) => {
    const getFile = file.target.files && file.target.files[0];

    setCurrentMedia(getFile, file.target.value);
    getUrlImage(getFile);
  }

  return (
    <label className="message-panel-image" title="Добавить изображение">
      <PaperclipIcon />
      <input
        type="file"
        className="message-panel-image__file"
        value={pathSelectedMedia}
        onChange={addFileInState} />
    </label>
  )
};

export default connect(null, { currentSelectedImage })(MessagePanelImages);
