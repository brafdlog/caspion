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
import { ReportProblem } from '@/modules/reporting';
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
          + `title=${encodeURIComponent(title)}`
          + `&body=${encodeURIComponent(formattedDetailes)}${encodeURIComponent(formattedLog)}`;
};

const defaultFormData = {
  title: '',
  email: '',
  detailes: '',
  attachLogs: true,
};

export default {
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
    detailesRule() {
      return !!this.formData.detailes || this.formData.attachLogs || 'You must describe your report or attach the logs';
    },
    openGithub() {
      this.validateEmail = false;
      if (this.$refs.form.validate()) {
        const url = createGithubIssueLink(
          this.formData.title,
          this.formData.detailes,
          this.formData.attachLogs ? this.raw : '',
        );
        this.$logger.info(`Open bug report url with title: ${this.formData.title}`);
        shell.openExternal(url);
      }
    },
    sendReport() {
      this.validateEmail = true;
      if (this.$refs.form.validate()) {
        const eventId = ReportProblem(
          this.formData.title,
          this.formData.detailes,
          this.formData.attachLogs ? this.raw : '',
          this.formData.email,
        );

        this.$logger.info(`Problem reported. Event ${eventId}`);
        this.dialog = false;
      }
    },
    resetForm() {
      this.raw = this.$logger.getLastLines(10);
      this.formData = { ...defaultFormData };
      this.validateEmail = false;
    },
  },
};
</script>

<style>
</style>
