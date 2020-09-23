import React from 'react';

const PasswordIcon = ({ color = '#445058' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none">
      <g clipPath="url(#A)" fill={color}>
        <path
          d="M8.594 4.375h-.47v-1.25A3.13 3.13 0 0 0 5 0a3.13 3.13 0 0 0-3.125 3.125v1.25h-.47A1.41 1.41 0 0 0 0 5.781v5.313A1.41 1.41 0 0 0 1.406 12.5h7.188A1.41 1.41 0 0 0 10 11.094V5.78a1.41 1.41 0 0 0-1.406-1.406zm-5.47-1.25A1.88 1.88 0 0 1 5 1.25a1.88 1.88 0 0 1 1.875 1.875v1.25h-3.75v-1.25zm9.376 8.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 1 1 0 2.5zM14.53 15h-4.06a.47.47 0 0 1-.469-.469v-.312A1.72 1.72 0 0 1 11.72 12.5h1.563A1.72 1.72 0 0 1 15 14.219v.313a.47.47 0 0 1-.469.469z" />
      </g>
      <defs>
        <clipPath id="A">
          <rect width="15" height="15" rx="3" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  )
};

export default PasswordIcon;

