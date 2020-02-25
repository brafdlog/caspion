<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <slot :on="on" />
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Report a problem</span>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="formData.title"
                  label="Title"
                  hint="Describe the bug in one sentence"
                  persistent-hint
                  required
                  :rules="[titleRule]"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  v-model="formData.detailes"
                  label="Bug Details (אפשר לכתוב בעברית)"
                  filled
                  :rules="[detailesRule]"
                  :required="!formData.attachLogs"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-checkbox
                  v-model="formData.attachLogs"
                  :required="!formData.detailes"
                >
                  <template slot="label">
                    Attach logs &nbsp;(
                    <log-sheet :raw="raw">
                      <template v-slot="{ on }">
                        <a @click.prevent="on.click">see</a>
                      </template>
                    </log-sheet>
                    )
                  </template>
                </v-checkbox>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          Close
        </v-btn>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          :disabled="!valid"
          @click="open"
        >
          Open Github Issue
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import fs from 'fs';
import { shell } from 'electron';
import LogSheet from './LogSheet';

const createGithubIssueLink = (title, detailes, log) => {
  const formattedDetailes = detailes ? `
## Detailes

${detailes}` : '';

  const formattedLog = log ? `
## Log
\`\`\`
${log}
\`\`\`` : '';

  return 'https://github.com/baruchiro/israeli-bank-scrapers-desktop/issues/new?'
          + `title=${escape(title)}`
          + `&body=${escape(formattedDetailes)}${escape(formattedLog)}`;
};

export default {
  name: 'ReportProblemDialog',
  components: { LogSheet },
  data() {
    return {
      dialog: false,
      valid: false,
      formData: {
        title: '',
        detailes: '',
        attachLogs: true,
      },
      raw: null,
    };
  },
  watch: {
    formData() {
      this.$nextTick(this.$refs.form.validate);
    },
    dialog() {
      fs.promises.readFile(this.$logger.transports.file.getFile().path).then((text) => {
        const lines = text.toString().split('\n');
        const lastLines = lines.slice(lines.length - 10);
        this.raw = lastLines.join('\n');
      });
    },
  },
  methods: {
    titleRule: (v) => !!v || 'Title is required',
    detailesRule() {
      return !!this.formData.detailes || this.formData.attachLogs || 'You must describe your report or attach the logs';
    },
    open() {
      if (this.$refs.form.validate()) {
        const url = createGithubIssueLink(this.formData.title, this.formData.detailes, this.formData.attachLogs ? this.raw : '');
        this.$logger.info(`Open bug report url with title: ${this.formData.title}`);
        shell.openExternal(url);
      }
    },
  },
};
</script>

<style>

</style>
