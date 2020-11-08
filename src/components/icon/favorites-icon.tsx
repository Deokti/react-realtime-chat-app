import React, { memo } from 'react';

const FavoritesIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none">
      <g clipPath="url(#A)">
        <path
          d="M18.85 2.43l4.58 10.838 11.724 1.007c.813.07 1.144 1.085.527 1.62l-8.892 7.704 2.665 11.46c.185.796-.678 1.423-1.377 1L18 29.982 7.926 36.058c-.7.42-1.562-.205-1.377-1l2.665-11.46L.32 15.892c-.617-.534-.288-1.55.527-1.62l11.723-1.007L17.15 2.43c.318-.754 1.384-.754 1.702 0z"
          fill="#9f9da3" />
      </g>
      <defs>
        <clipPath id="A">
          <path fill="#fff" d="M0 0h36v36H0z" />
        </clipPath>
      </defs>
    </svg>
  )
};

export default memo(FavoritesIcon);

