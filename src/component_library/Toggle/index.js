import React from 'react';
import './index.css';

export default props => {
  return (
    <label className="switch">
      <input type="checkbox" {...props} />
      <span className="slider"></span>
    </label>
  );
};
