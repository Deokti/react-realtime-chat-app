import React from 'react';


const SpinnerLoader = ({ width = 35, height = 35 }: {  width?: string | number, height?: string | number }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" display="block">
      <circle cx="50" cy="50" r="30"
        strokeWidth="10" stroke="#fdfdfd" strokeDasharray="47.12388980384689 47.12388980384689" fill="none" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50" />
      </circle>
    </svg>
  );
}

export default SpinnerLoader;