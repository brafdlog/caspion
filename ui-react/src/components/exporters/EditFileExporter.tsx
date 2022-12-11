import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {
  Button, Card, Form, Image
} from 'react-bootstrap';
import { Exporter } from '../../types';
import styles from './EditFileExporter.module.css';

type EditFileExporterProps = {
    handleSave: (exporter: Exporter) => Promise<void>;
    exporter: Exporter;
}

const EditFileExporter = ({
  handleSave,
  exporter
}: EditFileExporterProps) => {
  const [exporterConfig, setExporterConfig] = useState<Exporter>(exporter);

  const handleActiveChange = () => {
    setExporterConfig({
      ...exporterConfig,
      active: !exporterConfig.active
    });
  };
  const updateOption = (optionUpdates) => {
    setExporterConfig({
      ...exporterConfig,
      options: {
        ...exporterConfig.options,
        ...optionUpdates
      }
    });
  };

  const handleChooseFile = (event) => {
    updateOption({
      filePath: event.currentTarget.value
    });
  };
  const handleSaveClick = async () => {
    await handleSave(exporterConfig);
  };

  return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <Image className={styles.logo} src={exporterConfig.logo} roundedCircle width={100} height={100} />
                <Card.Body className={styles.cardBody}>
                    <Form>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>לאיזה קובץ לכתוב את הטרנזאקציות?</Form.Label>
                            <Form.Control value={exporterConfig.options.filePath} onChange={handleChooseFile} />
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
