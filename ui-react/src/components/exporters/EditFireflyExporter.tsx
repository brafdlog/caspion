import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Card, Form, Image } from 'react-bootstrap';
import { FireflyConfig } from '../../types';
import styles from './EditFileExporter.module.css';

type EditFireflyExporterProps = {
  handleSave: (exporter: FireflyConfig) => Promise<void>;
  exporterConfig: FireflyConfig;
};

const EditFireflyExporter = ({
  handleSave,
  exporterConfig,
}: EditFireflyExporterProps) => {
  const [fireflyOptions, setFireflyOptions] = useState(
    toJS(exporterConfig.options),
  );
  const [active, setActive] = useState(exporterConfig.active);

  const updateOption = (optionUpdates: Partial<typeof fireflyOptions>) => {
    setFireflyOptions((prev) => ({
      ...prev,
      ...optionUpdates,
    }));
  };
  const handleSaveClick = async () => {
    await handleSave({
      ...exporterConfig,
      active,
      options: fireflyOptions,
    });
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Image
          className={styles.logo}
          src={exporterConfig.logo}
          roundedCircle
          width={100}
          height={100}
        />
        <Card.Body className={styles.cardBody}>
          <Form>
            <Form.Group controlId="pat" className="mb-3">
              <Form.Label>Personal Access Token</Form.Label>
              <Form.Control
                type="password"
                value={fireflyOptions.token}
                onChange={(e) => updateOption({ token: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="baseURL" className="mb-3">
              <Form.Label>Base URL</Form.Label>
              <Form.Control
                type="text"
                value={fireflyOptions.baseURL}
                onChange={(e) =>
                  updateOption({
                    baseURL: new URL('/api', e.target.value).href,
                  })
                }
                placeholder="https://demo.firefly-iii.org"
              />
            </Form.Group>
            <Form.Group controlId="exporterActive">
              <Form.Check
                type="switch"
                onChange={() => setActive(!active)}
                label="Active"
                checked={active}
              />
            </Form.Group>
          </Form>
          <div className={styles.actionButtonsWrapper}>
            <Button variant="primary" onClick={handleSaveClick}>
              שמור
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default observer(EditFireflyExporter);
