import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Collapse, ProgressBar } from 'react-bootstrap';

export default function UploadProgressAlert() {
  const count = useSelector(state => state.uploadProgressAlert.count);
  const handleBeforeUnload = event => {
    const message = 'Are you sure? \n Upload in progress.';
    event.preventDefault();
    event.returnValue = message;
    return message;
  };

  useEffect(() => {
    if (count > 0) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    } else {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [count]);

  return (
    <Collapse in={count > 0}>
      <div className="upload-progress-bar">
        <h3>Upload in progress. Please do not leave the Guardian until it's complete.</h3>
        <ProgressBar style={{ height: '0.7rem' }} striped animated variant="danger" now="50" />
      </div>
    </Collapse>
  );
}
