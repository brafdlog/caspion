import { observer } from 'mobx-react-lite';
import { Card, Form } from 'react-bootstrap';
import { useConfigStore } from '../store/ConfigStore';
import styles from './GeneralSettings.module.css';

function GeneralSettings() {
  const configStore = useConfigStore();

  function toggleShowBrowser() {
    configStore.toggleShowBrowser();
  }

  const handleTimeoutChanged = (timeout: string) => {
    const numberTimeout = Number(timeout);
    if (numberTimeout) {
      configStore.setTimeout(numberTimeout);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Card.Body className={styles.cardBody}>
          <Form>
            <Form.Label>הראה דפדפן</Form.Label>
            <Form.Check
              type="switch"
              onClick={toggleShowBrowser}
              defaultChecked={configStore.config?.scraping?.showBrowser}
            />
            <Form.Group>
              <Form.Label>כמה ימים אחורה לחפש?</Form.Label>
              <Form.Control
                className={styles.input}
                defaultValue={configStore.config?.scraping.numDaysBack}
                onBlur={event => configStore.setNumDaysBack(event.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>כמה חשבונות לשלוף במקביל?</Form.Label>
              <Form.Control
                className={styles.input}
                defaultValue={configStore.config?.scraping.maxConcurrency}
                onBlur={event => configStore.setMaxConcurrency(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Chromium path</Form.Label>
              <Form.Control
                className={styles.input}
                defaultValue={configStore.config?.scraping.chromiumPath}
                onBlur={event => configStore.setChromiumPath(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>כמה זמן לחכות לשליפה? (millisec)</Form.Label>
              <Form.Control
                className={styles.input}
                defaultValue={configStore.config?.scraping.timeout}
                onBlur={event => handleTimeoutChanged(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default observer(GeneralSettings);
