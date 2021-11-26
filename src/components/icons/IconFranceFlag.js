import * as React from "react";

function SvgIconFranceFlag(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 47.5" {...props}>
      <defs>
        <clipPath id="icon--france-flag_svg__a" clipPathUnits="userSpaceOnUse">
          <path d="M0 38h38V0H0v38z" />
        </clipPath>
      </defs>
      <g
        clipPath="url(#icon--france-flag_svg__a)"
        transform="matrix(1.25 0 0 -1.25 0 47.5)"
      >
        <path d="M37 10a4 4 0 00-4-4h-8v26h8a4 4 0 004-4V10z" fill="#dd2e44" />
        <path d="M5 32a4 4 0 01-4-4V10a4 4 0 014-4h8v26H5z" fill="#269" />
        <path d="M25 6H13v26h12V6z" fill="#eee" />
      </g>
    </svg>
  );
}

export default SvgIconFranceFlag;
