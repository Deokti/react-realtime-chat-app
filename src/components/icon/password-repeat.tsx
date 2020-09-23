import React from 'react';

const PasswordRepeatIcon = ({ color = '#445058' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none">
      <g clipPath="url(#A)" fill={color}>
        <path
          d="M7.438 11.667h5.25c.723 0 1.313-.59 1.313-1.312V5.396c0-.723-.59-1.312-1.312-1.312H5.98c-.723 0-1.312.59-1.312 1.313v1.75c0 .242.196.438.438.438s.438-.196.438-.437v-1.75a.44.44 0 0 1 .438-.437h6.708a.44.44 0 0 1 .438.438v4.958a.44.44 0 0 1-.437.438h-5.25c-.242 0-.437.196-.437.438s.196.438.438.438z" />
        <path
          d="M6.854 4.958c.242 0 .438-.196.438-.437V2.917c0-1.126.916-2.042 2.042-2.042s2.042.916 2.042 2.042V4.52a.44.44 0 0 0 .438.438c.242 0 .438-.196.438-.437V2.917A2.92 2.92 0 0 0 9.333 0a2.92 2.92 0 0 0-2.917 2.917V4.52a.44.44 0 0 0 .438.438zM.438 10.5h1.167c.242 0 .438-.196.438-.437s-.196-.437-.437-.437h-.73v-.73c0-.242-.196-.438-.437-.438A.44.44 0 0 0 0 8.896v1.167c0 .242.196.438.437.438z" />
        <path
          d="M5.396 13.708c.242 0 .438-.196.438-.437v-1.167c0-.242-.196-.437-.437-.437H4.23a.44.44 0 0 0-.437.438c0 .242.196.438.437.438h.73v.73a.44.44 0 0 0 .438.438zm-.11-2.916a.46.46 0 0 0 .127-.019.44.44 0 0 0 .292-.546c-.375-1.233-1.495-2.06-2.787-2.06A2.9 2.9 0 0 0 .348 9.711a.44.44 0 0 0 .182.592.44.44 0 0 0 .592-.182c.352-.666 1.04-1.08 1.794-1.08.904 0 1.688.58 1.95 1.44.057.2.23.3.42.3h0z" />
        <path
          d="M2.917 14a2.9 2.9 0 0 0 2.568-1.545.44.44 0 0 0-.182-.592.44.44 0 0 0-.592.182c-.352.666-1.04 1.08-1.794 1.08-.9 0-1.683-.58-1.95-1.443-.072-.23-.316-.36-.547-.288s-.36.317-.288.547C.513 13.173 1.632 14 2.917 14z" />
      </g>
      <defs>
        <clipPath id="A">
          <rect width="14" height="14" rx="3" transform="matrix(-1 0 0 1 14 0)" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  )
};

export default PasswordRepeatIcon;
