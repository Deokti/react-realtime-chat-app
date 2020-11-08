import React, { memo } from 'react';
import { TIconSize } from "./index";

const ChatsIcon: React.FC<TIconSize> = ({ width = 36, height = 36, color = '#9f9da3' }: TIconSize) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none">
      <path
        d="M32.836 4.29H3.164A3.17 3.17 0 0 0 0 7.453v21.094a3.17 3.17 0 0 0 3.164 3.164h29.672A3.17 3.17 0 0 0 36 28.547V7.453a3.17 3.17 0 0 0-3.164-3.164zm-.437 2.11L18.067 20.73 3.61 6.398H32.4zM2.11 28.1V7.88l10.16 10.072L2.11 28.1zM3.6 29.602l10.165-10.165 3.562 3.53c.412.41 1.078.407 1.488-.003l3.473-3.473 10.1 10.1H3.6zm30.3-1.492L23.78 18l10.1-10.1V28.1z"
        fill={color} />
    </svg>
  )
};

export default memo(ChatsIcon);

