import React from 'react';

function PlusIcon() {
  return (
    <svg
      aria-hidden='true'
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='lightgray'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M0.875 26H0L0 24H0.875L0.875 26ZM4.375 26H2.625L2.625 24H4.375L4.375 26ZM7.875 26L6.125 26L6.125 24L7.875 24L7.875 26ZM11.375 26H9.625V24H11.375V26ZM14 26H13.125V24H14V26Z'
        fill='var(--icon-color)'
      ></path>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M36.875 26H36V24H36.875V26ZM40.375 26H38.625V24H40.375V26ZM43.875 26L42.125 26V24L43.875 24V26ZM47.375 26H45.625V24H47.375V26ZM50 26H49.125V24H50V26Z'
        fill='var(--icon-color)'
      ></path>
      <circle cx='25' cy='25' r='11' fill='var(--icon-color)'></circle>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M26 20H24V24H20V26H24V30H26V26H30V24H26V20Z'
        fill='white'
      ></path>
    </svg>
  );
}

export { PlusIcon };
