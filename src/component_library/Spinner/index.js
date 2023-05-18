import React from 'react';
import './index.css';
export default ({ show }) => {
  if (show) {
    return (
      <svg
        width="30"
        height="35"
        stroke="#000"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="spinner_V8m1">
          <circle cx="12" cy="12" r="9.5" fill="none" stroke="#00579b" stroke-width="3"></circle>
        </g>
      </svg>
    );
  } else {
    return null;
  }
};
