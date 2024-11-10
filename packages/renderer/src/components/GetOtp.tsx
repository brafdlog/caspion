import React, { useEffect, useState } from 'react';
import styles from './GetOtp.module.css';
import { Button, FormControl, Modal } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useConfigStore } from '/@/store/ConfigStore';
import { sendUserInput } from '#preload';
import { ModalStatus } from '/@/types';

const GetOtp = () => {
  const configStore = useConfigStore();
  const [modalStatus, setModalStatus] = useState<ModalStatus>(ModalStatus.HIDDEN);
  const [inputText, setInputText] = useState('');

  const closeModal = () => setModalStatus(ModalStatus.HIDDEN);

  useEffect(() => {
    if (configStore.getOtp !== undefined) {
      setModalStatus(configStore.getOtp ? ModalStatus.OTP : ModalStatus.HIDDEN);
    }
  }, [configStore.getOtp]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const sendInput = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await sendUserInput(inputText);
    closeModal();
  };

  if (!configStore.getOtp) {
    return null;
  }

  return (
    <Modal show={modalStatus !== ModalStatus.HIDDEN} onHide={closeModal}>
      <Modal.Header closeButton className={styles.modalHeader}></Modal.Header>
      <Modal.Body>
        <FormControl
          type="text"
          placeholder="Enter text here"
          value={inputText}
          onChange={handleInputChange}
          className="mb-3"
        />
        <Button variant="dark" name="send-report" type="submit" onClick={sendInput}>
          הכנס קוד
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default observer(GetOtp);
