import React, { useState } from 'react';
import { PaperclipIcon } from "../../icon";

import { connect } from "react-redux";
import { currentSelectedImage } from '../../../actions'

import './message-panel-images.scss';

type TMessagePanelImages = {
  currentSelectedImage: (image: string | null) => (any);
}

const MessagePanelImages: React.FC<TMessagePanelImages> = ({ currentSelectedImage }: TMessagePanelImages) => {

  const addFileInState = (file: React.ChangeEvent<HTMLInputElement>) => {
    const getFile = (file.target.files && file.target.files[0])
    getUrlImage(getFile);
  }

  const getUrlImage = (file: any) => {
    const reader = new FileReader();

    reader.onload = function () {
      currentSelectedImage(this.result as string);
    }
    reader.readAsDataURL(file);
  }

  return (
    <label className="message-panel-image" title="Добавить изображение">
      <PaperclipIcon />
      <input
        type="file"
        className="message-panel-image__file"
        onChange={addFileInState} />
    </label>
  )
};

export default connect(null, { currentSelectedImage })(MessagePanelImages);
