import React from 'react';
import FixedProgress from 'component_library/FixedProgress';

export default function UploadProgressAlert({ uploads }) {
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
    <FixedProgress
      title={"Upload in progress. Please do not leave the Guardian until it's complete."}
      show={uploadCount > 0}
      progress={progress}
      label={`${uploadCount} FILE(S)`}
    />
  );
}
