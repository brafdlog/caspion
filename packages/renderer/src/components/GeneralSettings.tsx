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

  const handlePeriodicScrapingIntervalHoursChanged = (interval: string) => {
    configStore.setPeriodicScrapingIntervalHours(Number(interval));
  };

  const handleSameProviderDelaySecondsChanged = (delay: string) => {
    const trimmed = delay.trim();
    if (trimmed === '') {
      configStore.setSameProviderDelaySeconds(undefined);
      return;
    }
    const numberDelay = Number(trimmed);
    if (!Number.isNaN(numberDelay) && numberDelay >= 0) {
      configStore.setSameProviderDelaySeconds(numberDelay);
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
                onBlur={(event) => configStore.setNumDaysBack(Number(event.target.value))}
                autoFocus
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>כמה חשבונות לשלוף במקביל?</Form.Label>
              <Form.Control
                className={styles.input}
                defaultValue={configStore.config?.scraping.maxConcurrency}
                onBlur={(event) => configStore.setMaxConcurrency(Number(event.target.value))}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>השהייה בין חשבונות מאותו ספק (שניות)</Form.Label>
              <Form.Control
                className={styles.input}
                placeholder="15"
                defaultValue={configStore.config?.scraping.sameProviderDelaySeconds}
                onBlur={(event) => handleSameProviderDelaySecondsChanged(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Chromium path</Form.Label>
              <Form.Control
                className={styles.input}
                defaultValue={configStore.config?.scraping.chromiumPath}
                onBlur={(event) => configStore.setChromiumPath(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>כמה זמן לחכות לשליפה? (milliseconds)</Form.Label>
              <Form.Control
                className={styles.input}
                defaultValue={configStore.config?.scraping.timeout}
                onBlur={(event) => handleTimeoutChanged(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>לרוץ אוטומטית כל X שעות</Form.Label>
              <Form.Control
                className={styles.input}
                defaultValue={configStore.config?.scraping.periodicScrapingIntervalHours}
                onBlur={(event) => handlePeriodicScrapingIntervalHoursChanged(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default observer(GeneralSettings);
