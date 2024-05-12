import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { Exporter } from '../../types';
import styles from './EditFileExporter.module.css';

type EditFireflyExporterProps = {
  handleSave: (exporter: Exporter) => Promise<void>;
  exporter: Exporter;
};

const EditFireflyExporter = ({
  handleSave,
  exporter,
}: EditFireflyExporterProps) => {
  const [exporterConfig, setExporterConfig] = useState<Exporter>(exporter);

  // TODO: Implement
  console.error('Not Implemented');

  const handleActiveChange = () => {
    setExporterConfig({
      ...exporterConfig,
      active: !exporterConfig.active,
    });
  };
  const updateOption = (optionUpdates) => {
    setExporterConfig({
      ...exporterConfig,
      options: {
        ...exporterConfig.options,
        ...optionUpdates,
      },
    });
  };
  const handleSaveClick = async () => {
    await handleSave(exporterConfig);
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
