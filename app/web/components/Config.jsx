import React from 'react';
import styles from './Config.css';
import { TextField, Button } from '@material-ui/core';
import { ipcRenderer } from 'electron';
import events from '../../constants/events';
import { jsonStringifyPretty } from '../../utils';

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
    ipcRenderer.send(events.config.updateConfig, JSON.parse(this.state.config));
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>config</h1>
        <TextField
          className={styles.configTextField}
          value={this.state.config}
          multiline={true}
          rows={10}
          onChange={(event) => this.setState({config: event.target.value })}
        />
        <Button variant="contained" color="primary" onClick={this.saveConfig}>
          Save
        </Button>
      </div>
    );
  }
}
