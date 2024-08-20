import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import {
  Button, Card, Form, Image,
} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { type YnabConfig } from '../../types';
import styles from './EditYnabExporter.module.css';

import YnabAccountMappingTable from './YnabAccountMappingTable';
import { useStore } from '/@/store';

interface EditYnabExporterProps {
  handleSave: (exporterConfig: YnabConfig) => Promise<void>;
  exporterConfig: YnabConfig;
}

const INVALID_ACCESS_TOKEN = 'INVALID_ACCESS_TOKEN';

const EditYnabExporter = ({ handleSave, exporterConfig }: EditYnabExporterProps) => {
  const [ynabOptions, setYnabOptions] = useState<YnabConfig['options']>(toJS<YnabConfig['options']>(exporterConfig.options));
  const [active, setActive] = useState<boolean>(exporterConfig.active);
  const store = useStore();

  const isLoading = !store.ynabAccountData || store.fetchingYnabAccountData;
  const isValidAccessToken = !isLoading && store.ynabAccountData?.status !== INVALID_ACCESS_TOKEN;

  useEffect(() => {
    if (ynabOptions.accessToken) {
      store.fetchYnabAccountData(ynabOptions);
    }
    // eslint-disable-next-line
  }, [ynabOptions.budgetId, ynabOptions.accessToken, store]);

  const updateOptionsState = (optionUpdates: Partial<YnabConfig['options']>) => {
    setYnabOptions({
      ...ynabOptions,
      ...optionUpdates,
    });
  };
  const handleSaveClick = async () => {
    await handleSave({
      ...exporterConfig,
      active,
      options: ynabOptions,
    });
  };

  const handleOptionChangeEvent = (propertyName: keyof YnabConfig["options"], event: React.ChangeEvent<HTMLInputElement>) => {
    updateOptionsState({ [propertyName]: event.target.value });
  };

  const handleAccountMappingChange = (updatedAccountMapping: YnabConfig['options']['accountNumbersToYnabAccountIds']) => {
    updateOptionsState({ accountNumbersToYnabAccountIds: updatedAccountMapping });
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Image className={styles.logo} src={exporterConfig.logo} roundedCircle width={100} height={100} />
        <Card.Body className={styles.cardBody}>
          <Form className={styles.form}>
            <Form.Group controlId='accessToken' className='mb-3'>
              <Form.Label>Ynab access token</Form.Label>
              <Form.Control type='password' value={ynabOptions.accessToken} onChange={(event) => handleOptionChangeEvent('accessToken', event)} />
            </Form.Group>
            {isValidAccessToken
              && <Form.Group controlId='budgetId' className='mb-3'>
                <Form.Label>Budget id</Form.Label>
                <Form.Select
                  disabled={store.fetchingYnabAccountData}
                  defaultValue={ynabOptions.budgetId}
                  onChange={(event) => handleOptionChangeEvent('budgetId', event)}>
                  {store.ynabAccountData?.ynabAccountData?.budgets.map((budget) => <option key={budget.id} value={budget.id}>{budget.name}</option>)}
                </Form.Select>
              </Form.Group>
            }
            {!isLoading && !isValidAccessToken && <div>Invalid access token</div>}
            {isLoading && <Spinner style={{ width: '20px', height: '20px' }} animation="border" variant="primary" />}
            {!isLoading && isValidAccessToken
              && <Form.Group controlId='accountNumbersToYnabAccountIds' className='mb-3'>
                <YnabAccountMappingTable
                  accountNumberToYnabIdMapping={ynabOptions.accountNumbersToYnabAccountIds}
                  onUpdate={handleAccountMappingChange}
                  ynabAccountData={store.ynabAccountData}
                  budgetId={ynabOptions.budgetId} />
              </Form.Group>
            }
            <Form.Group controlId='exporterActive'>
              <Form.Check
                type='switch'
                onChange={() => setActive(!active)}
                label='Active'
                checked={active}
              />
            </Form.Group>
          </Form>
          <div className={styles.actionButtonsWrapper}>
            <Button variant='primary' onClick={handleSaveClick}>שמור</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default observer(EditYnabExporter);
