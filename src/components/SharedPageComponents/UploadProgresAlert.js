import React from 'react';
import { useSelector } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';

export default function UploadProgressAlert() {
  const uploads = useSelector(state => state.uploadProgressAlert.uploads);
  const uploadCount = Object.keys(uploads).length;
  let progress = 0;
  if (uploadCount > 0) {
    // TODO: Extract this to a funtion which returns average
    for (const key in uploads) {
      progress += uploads[key];
    }
    progress = progress / uploadCount;
  }

  return (
    <div style={{ display: uploadCount > 0 ? 'block' : 'none' }} className="upload-progress-bar">
      <h3>Upload in progress. Please do not leave the Guardian until it's complete.</h3>
      <ProgressBar
        style={{ height: '0.7rem' }}
        striped
        animated
        variant="danger"
        now={progress}
        label={`${uploadCount} FILE(S)`}
      />
    </div>
  );
}
