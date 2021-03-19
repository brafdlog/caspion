<template>
  <v-dialog v-model="dialog">
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
              <v-col>
                <v-text-field
                  v-model="formData.email"
                  label="Email"
                  hint="We need your mail to contact you if you send a report"
                  persistent-hint
                  :rules="[emailExistRule, emailValidRule]"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  v-model="formData.details"
                  label="Bug Details (אפשר לכתוב בעברית)"
                  filled
                  :rules="[detailsRule]"
                  :required="!formData.attachLogs"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-checkbox
                  v-model="formData.attachLogs"
                  :required="!formData.details"
                >
                  <template slot="label">
                    Attach logs (<a @click.prevent="sheet = true">see</a>)
                    <log-sheet
                      v-model="sheet"
                      :raw="raw"
                    />
                  </template>
                </v-checkbox>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
          <br>
          <small>You can find the logs here: {{ logsDir }}</small>
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
          @click="openGithub"
        >
          Open Github Issue
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="sendReport"
        >
          Send Report
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { shell } from 'electron';
import Sentry from '@/logging/sentry';
import LogSheet from '@/ui/components/shared/LogSheet';
import os from 'os';
import { getLastLines, getLogsFolder } from '@/logging/logger';
import { defineComponent } from '@vue/composition-api';
import { repository } from '../../../../package.json';

const createGithubIssueLink = (title, details, log) => {
  const formattedDetails = details ? `
## Details

${details}` : '';

  const formattedLog = log ? `
## Log
\`\`\`
${log}
\`\`\`` : '';

  const sysInfo = `
## System Info

 - Source Version: \`${SOURCE_COMMIT_SHORT || 'unknown'}\`
 - OS: \`${os.platform()}${os.arch()}\`
 - OS Version: \`${os.release()}\`
`;

  return `${`${repository}/issues/new?`
          + `title=${encodeURIComponent(title)}`
          + '&body='}${
    encodeURIComponent(formattedDetails + formattedLog + sysInfo)}`;
};

const defaultFormData = {
  title: '',
  email: '',
  details: '',
  attachLogs: true,
};

export default defineComponent({
  name: 'ReportProblemDialog',
  components: { LogSheet },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      valid: false,
      sheet: false,
      validateEmail: false,
      formData: { ...defaultFormData },
      raw: null,
      logsDir: getLogsFolder()
    };
  },
  computed: {
    dialog: {
      get() { return this.value; },
      set(visible) { this.$emit('input', visible); },
    },
  },
  watch: {
    dialog() {
      this.$nextTick(this.resetForm);
    },
  },
  methods: {
    titleRule: (v) => !!v || 'Title is required',
    emailExistRule(v) { return !this.validateEmail || !!v || 'Email is required'; },
    emailValidRule(v) { return !this.validateEmail || /.+@.+\..+/.test(v) || 'Email must be valid'; },
    detailsRule() {
      return !!this.formData.details || this.formData.attachLogs || 'You must describe your report or attach the logs';
    },
    openGithub() {
      this.validateEmail = false;
      if (this.$refs.form.validate()) {
        const url = createGithubIssueLink(
          this.formData.title,
          this.formData.details,
          this.formData.attachLogs ? this.raw : '',
        );
        this.$logger.info(`Open bug report url with title: ${this.formData.title}`);
        shell.openExternal(url);
      }
    },
    sendReport() {
      this.validateEmail = true;
      if (this.$refs.form.validate()) {
        const eventId = Sentry.userReportProblem(
          this.formData.title,
          this.formData.details,
          this.formData.attachLogs ? this.raw : '',
          this.formData.email,
        );

        this.$logger.info(`Problem reported. Event ${eventId}`);
        this.dialog = false;
      }
    },
    resetForm() {
      this.raw = getLastLines(10);
      this.formData = { ...defaultFormData };
      this.validateEmail = false;
    },
  },
});
</script>

<style>
</style>
