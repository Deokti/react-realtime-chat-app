import React, { memo } from 'react';

const EmailIcon = ({ color = '#445058' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none">
      <g clipPath="url(#A)" fill={color}>
        <path
          d="M.536 2.143h13.93L7.5 7.88.457 2.16a.42.42 0 0 1 .08-.016zm6.626 6.844c.197.162.48.162.68 0L15 3.1v9.233c0 .296-.24.536-.536.536H.536c-.296 0-.536-.24-.536-.536V3.168l7.162 5.82z" />
      </g>
      <defs>
        <clipPath id="A">
          <rect width="15" height="15" rx="3" transform="matrix(-1 0 0 1 15 0)" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  )
};

export default memo(EmailIcon);

