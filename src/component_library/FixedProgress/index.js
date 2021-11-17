import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import './index.css';

export default ({ title = '', label = '', show = false, progress = 0 }) => (
  <div style={{ display: show ? 'block' : 'none' }} className="upload-progress-bar">
    <h3>{title}</h3>
    <ProgressBar
      style={{ height: '0.7rem' }}
      striped
      animated
      variant="danger"
      now={progress}
      label={label}
    />
  </div>
);
