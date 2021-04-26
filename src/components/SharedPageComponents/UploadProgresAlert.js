import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';

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
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [count]);

  return count > 0 ? (
    <ProgressBar
      striped
      animated
      variant="info"
      now={50}
      label={`Uploading ${count} file(s)... Please do not close or refresh the page...`}
    />
  ) : (
    <></>
  );
}
