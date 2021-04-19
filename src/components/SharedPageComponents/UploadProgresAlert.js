import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

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

  return <></>;
}
