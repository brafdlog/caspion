import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {
  Button, Card, Form, Image,
} from 'react-bootstrap';
import { showSaveDialog } from '#preload';
import { type Exporter } from '../../types';
import styles from './EditFileExporter.module.css';

interface EditFileExporterProps {
    handleSave: (exporter: Exporter) => Promise<void>;
    exporter: Exporter;
}

const EditFileExporter = ({
  handleSave,
  exporter,
}: EditFileExporterProps) => {
  const [exporterConfig, setExporterConfig] = useState<Exporter>(exporter);

  const handleActiveChange = () => {
    setExporterConfig({
      ...exporterConfig,
      active: !exporterConfig.active,
    });
  };
  const updateOption = (optionUpdates: Partial<Exporter['options']>) => {
    setExporterConfig({
      ...exporterConfig,
      options: {
        ...exporterConfig.options,
        ...optionUpdates,
      },
    });
  };

  const handleChooseFile: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    updateOption({
      filePath: event.currentTarget.value,
    });
  };
  const handleSaveClick = async () => {
    await handleSave(exporterConfig);
  };

  const selectFolderDialog = async () => {
    const filePath = await showSaveDialog();
    if (filePath) {
      updateOption({ filePath });
    }
  };

  return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <Image className={styles.logo} src={exporterConfig.logo} roundedCircle width={100} height={100} />
                <Card.Body className={styles.cardBody}>
                    <Form>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>לאיזה קובץ לכתוב את הטרנזאקציות?</Form.Label>
                            <Form.Control contentEditable={false}
                            value={exporterConfig.options.filePath} onClick={selectFolderDialog} onChange={handleChooseFile} />
                        </Form.Group>
                        <Form.Group controlId='exporterActive'>
                            <Form.Check
                                type="switch"
                                onChange={handleActiveChange}
                                label="פעיל"
                                checked={exporterConfig.active}
                            />
                        </Form.Group>
                    </Form>
                    <div className={styles.actionButtonsWrapper}>
                        <Button variant="primary" onClick={handleSaveClick}>שמור</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
  );
};

export default observer(EditFileExporter);
