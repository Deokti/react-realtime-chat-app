import React, { memo } from 'react';
import { TIconSize } from "./index";


const ChannelsIcon: React.FC<TIconSize> = ({ size = 36, color = '#9f9da3' }: TIconSize) => {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 0C8.05188 0 0 8.05051 0 18C0 21.1572 0.823425 24.2408 2.38705 26.9604L0.0678406 34.1625C-0.0939331 34.6646 0.0390015 35.215 0.411987 35.588C0.781403 35.9574 1.33044 36.0953 1.83746 35.9322L9.03955 33.6129C11.7592 35.1766 14.8428 36 18 36C27.9481 36 36 27.9495 36 18C36 8.05188 27.9495 0 18 0ZM18 33.1875C15.1482 33.1875 12.3684 32.3918 9.96103 30.8864C9.61469 30.67 9.18457 30.6115 8.78439 30.7403L3.58539 32.4146L5.2597 27.2156C5.3866 26.8212 5.33304 26.3905 5.11331 26.039C3.60818 23.6316 2.8125 20.8518 2.8125 18C2.8125 9.62567 9.62567 2.8125 18 2.8125C26.3743 2.8125 33.1875 9.62567 33.1875 18C33.1875 26.3743 26.3743 33.1875 18 33.1875ZM19.7578 18C19.7578 18.9706 18.9709 19.7578 18 19.7578C17.0291 19.7578 16.2422 18.9706 16.2422 18C16.2422 17.0291 17.0291 16.2422 18 16.2422C18.9709 16.2422 19.7578 17.0291 19.7578 18ZM26.7891 18C26.7891 18.9706 26.0022 19.7578 25.0312 19.7578C24.0603 19.7578 23.2734 18.9706 23.2734 18C23.2734 17.0291 24.0603 16.2422 25.0312 16.2422C26.0022 16.2422 26.7891 17.0291 26.7891 18ZM12.7266 18C12.7266 18.9706 11.9397 19.7578 10.9688 19.7578C9.99811 19.7578 9.21094 18.9706 9.21094 18C9.21094 17.0291 9.99811 16.2422 10.9688 16.2422C11.9397 16.2422 12.7266 17.0291 12.7266 18Z"
        fill={color} />
    </svg>
  )
};

export default memo(ChannelsIcon);

