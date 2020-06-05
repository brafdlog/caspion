/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, Paper } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { jsonStringifyPretty } from '../../../../webUtils';

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    backgroundColor: 'yellow',
    marginTop: '20px'
  },
  configTextField: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    direction: 'ltr'
  },
  expansionContainer: {
    flex: 1
  },
  configTextPaper: {
    backgroundColor: '#f0f0f0'
  }
}));

const AdvancedConfig = ({ config, saveConfig }) => {
  const classes = useStyles();
  const [configStr, setConfigStr] = useState(jsonStringifyPretty(config));

  useEffect(() => {
    setConfigStr(jsonStringifyPretty(config));
  }, [config]);

  return (
    <div className={classes.wrapper}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          הגדרות מתקדמות
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container className={classes.expansionContainer}>
            <Grid item xs={12}>
              <Paper className={classes.configTextPaper} variant="outlined">
                <TextField
                  className={classes.configTextField}
                  value={configStr}
                  multiline
                  rows={10}
                  onChange={event => setConfigStr(event.target.value)}
                  fullWidth
                />
              </Paper>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => saveConfig(JSON.parse(configStr))}>
                Save
              </Button>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default AdvancedConfig;
