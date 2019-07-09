import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { ipcRenderer } from 'electron';
import styles from './Config.css';
import events from '../../../../constants/events';
import { jsonStringifyPretty } from '../../../webUtils';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.saveConfig = this.saveConfig.bind(this);
  }

  componentDidMount() {
    ipcRenderer.send(events.config.getCurrentConfig);
    ipcRenderer.on(events.config.gotCurrentConfig, (event, config) =>
      this.setState({
        config: jsonStringifyPretty(config)
      })
    );
  }

  saveConfig() {
    const { config } = this.state;
    ipcRenderer.send(events.config.updateConfig, JSON.parse(config));
  }

  render() {
    const { config } = this.state;
    return (
      <div className={styles.container}>
        <h1>config</h1>
        <TextField
          className={styles.configTextField}
          value={config}
          multiline
          rows={10}
          onChange={event => this.setState({ config: event.target.value })}
        />
        <Button variant="contained" color="primary" onClick={this.saveConfig}>
          Save
        </Button>
      </div>
    );
  }
}
