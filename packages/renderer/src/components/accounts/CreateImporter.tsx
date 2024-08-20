import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { importers } from '../../accountMetadata';
import { type Importer } from '../../types';
import Account from './Account';
import styles from './CreateImporter.module.css';
import EditImporter from './EditImporter';

interface CreateImporterProps {
  handleSave: (importer: Importer) => Promise<void>;
  cancel: () => void;
}

export default function CreateImporter({
  handleSave,
  cancel,
}: CreateImporterProps) {
  const [importerToCreate, setImporterToCreate] = useState<Importer>();
  const handleChooseImporter = (importer: Importer) => setImporterToCreate({ ...importer, id: uuidv4() });
  return (
    <div className={styles.container}>
      {importerToCreate
        ? <EditImporter importer={importerToCreate} handleSave={handleSave} handleDelete={cancel} />
        : <div className={styles.accountSelectionWrapper}>
          {
            importers.map((importer) => <div key={importer.id} className={styles.accountWrapper} onClick={() => handleChooseImporter(importer)}>
                <Account account={importer} />
              </div>)
          }
        </div>
      }
    </div>
  );
}
