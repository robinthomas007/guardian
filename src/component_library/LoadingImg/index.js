import React from 'react';
import './index.css';

export default ({ show }) => {
  if (show) {
    return (
      <div className="loading-animation-bg">
        <div className="loading-bars">
          <svg
            width="70"
            height="80"
            viewBox="0 0 70 80"
            xmlns="http://www.w3.org/2000/svg"
            fill="#FFF"
          >
            <g transform="matrix(1 0 0 -1 0 80)">
              <rect width="10" height="20" rx="3">
                <animate
                  attributeName="height"
                  begin="0s"
                  dur="4.3s"
                  values="20;45;57;80;64;32;66;45;20"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </rect>
              <rect x="15" width="10" height="80" rx="3">
                <animate
                  attributeName="height"
                  begin="0s"
                  dur="2.4s"
                  values="80;55;33;5;75;2;80"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </rect>
              <rect x="30" width="10" height="50" rx="3">
                <animate
                  attributeName="height"
                  begin="0s"
                  dur="1.4s"
                  values="50;34;78;23;56;50"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </rect>
              <rect x="45" width="10" height="30" rx="3">
                <animate
                  attributeName="height"
                  begin="0s"
                  dur="2s"
                  values="30;45;13;80;56;30"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </rect>
              <rect x="60" width="10" height="70" rx="3">
                <animate
                  attributeName="height"
                  begin="0s"
                  dur="2.4s"
                  values="30;45;13;80;56;30"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </rect>
            </g>
          </svg>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
