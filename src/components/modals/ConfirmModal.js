import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './ConfirmModal.css';
import { useTranslation } from 'react-i18next';

export default ({ show, title, onHide, onConfirm }) => {
  const { t } = useTranslation();
  return (
    <Modal id="ConfirmModal" show={show} onHide={onHide}>
      <Modal.Body>
        {title}
        <span>
          <br />
          <Button variant="primary" type="button" onClick={onConfirm}>
            {t('translation:Yes')}
          </Button>
          <Button variant="primary" type="button" onClick={onHide}>
            {t('translation:No')}
          </Button>
        </span>
      </Modal.Body>
    </Modal>
  );
};
