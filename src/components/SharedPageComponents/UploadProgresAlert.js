import React from 'react';
import FixedProgress from 'component_library/FixedProgress';
import { useTranslation } from 'react-i18next';

export default function UploadProgressAlert({ uploads }) {
  const uploadCount = Object.keys(uploads).length;
  const { t, i18n } = useTranslation();
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
      title={t('audio:UploadInProgress')}
      show={uploadCount > 0}
      progress={progress}
      label={`${uploadCount} FILE(S)`}
    />
  );
}
