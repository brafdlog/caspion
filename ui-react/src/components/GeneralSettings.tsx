import { Card, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import styles from './GeneralSettings.module.css';
import { StoreContext } from '../Store';

function GeneralSettings() {
  const store = useContext(StoreContext);
  function toggleShowBrowser() {
    store.toggleShowBrowser();
  }
  return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <Card.Body className={styles.cardBody}>
                    <Form>
                        <Form.Label>הראה דפדפן</Form.Label>
                        <Form.Check
                            type="switch"
                            onClick={toggleShowBrowser}
                            defaultChecked={store.config?.scraping?.showBrowser}
                        />
                        <Form.Group>
                            <Form.Label>כמה ימים אחורה לחפש?</Form.Label>
                            <Form.Control className={styles.input} defaultValue={store.config?.scraping.numDaysBack} onBlur={(event) => store.setNumDaysBack(event.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>כמה חשבונות לשלוף במקביל?</Form.Label>
                            <Form.Control className={styles.input} defaultValue={store.config?.scraping.maxConcurrency} onBlur={(event) => store.setMaxConcurrency(event.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Chromium path</Form.Label>
                            <Form.Control className={styles.input} defaultValue={store.config?.scraping.chromiumPath} onBlur={(event) => store.setChromiumPath(event.target.value)}/>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
  );
}

export default observer(GeneralSettings);
