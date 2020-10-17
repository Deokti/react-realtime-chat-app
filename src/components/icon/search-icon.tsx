import React from "react";

const SearchIcon = ({ color = "#9F9DA3" }) => {

  return (
    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.84882 0C3.98793 0 0.857422 3.13253 0.857422 6.99594C0.857422 10.8593 3.98793 13.9919 7.84885 13.9919C9.33352 13.9919 10.7104 13.5285 11.8422 12.7392L11.843 12.7384L17.0282 17.9269C17.1244 18.0232 17.2774 18.0256 17.3761 17.9269L18.7736 16.5285C18.8698 16.4322 18.8649 16.2726 18.7728 16.1804L13.5884 10.9927C14.3772 9.85933 14.8402 8.48154 14.8402 6.99594C14.8402 3.13253 11.7097 0 7.84882 0ZM7.84882 12.3458C4.89596 12.3458 2.50244 9.9507 2.50244 6.99594C2.50244 4.04118 4.89599 1.64611 7.84882 1.64611C10.8016 1.64611 13.1952 4.04118 13.1952 6.99594C13.1952 9.9507 10.8017 12.3458 7.84882 12.3458Z"
        fill={color} />
    </svg>
  )
}


export default SearchIcon;