import React, { memo } from 'react';

import './message-panel-fullpage.scss';
import { CloseIcon } from "../../icon";

type TMessagePanelFullpage = {
  imageURL: string
  closeFullpageImage: () => void
}

const MessagePanelFullpage: React.FC<TMessagePanelFullpage> = ({ imageURL, closeFullpageImage }: TMessagePanelFullpage) => {

  return (
    <div className="message-panel-fullpage">
      <button className="message-panel-fullpage__close" onClick={closeFullpageImage}>
        <CloseIcon size={30} className="message-panel-fullpage__close-icon" />
      </button>
      <div className="message-panel-fullpage__wrapper" onClick={closeFullpageImage}>
        <div className="message-panel-fullpage__inner">
          <img src={imageURL} alt="Картинка" />
        </div>
      </div>
    </div>
  )
};

export default memo(MessagePanelFullpage);
