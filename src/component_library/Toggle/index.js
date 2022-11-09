import React from 'react';
import './index.css';

export default ({ checked, onToggle, disabled }) => (
  <label className="switch">
    <input type="checkbox" checked={checked} onChange={onToggle} disabled={disabled} />
    <span className="slider"></span>
  </label>
);
