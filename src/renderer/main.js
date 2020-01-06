import Vue from 'vue';

import {
  Collapse,
  CollapseItem,
  Container,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Card,
  Button,
  Form,
  FormItem,
  Input,
  Tooltip,
  Checkbox,
  Table,
  TableColumn,
  Link,
  Progress,
} from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

// eslint-disable-next-line import/no-extraneous-dependencies
import electron from 'electron';
import App from './App';
import store from './store';
import LoggerPlugin from './vue-plugins/logger';

const logger = electron.remote.getGlobal('logger');
logger.info('The renderer process got the logger');
Vue.use(LoggerPlugin, { logger });

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

// configure language
locale.use(lang);

Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Main);
Vue.use(Card);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Tooltip);
Vue.use(Checkbox);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Link);
Vue.use(Progress);

/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  created() {
    logger.info('Main Vue component registered');
  },
  template: '<App/>',
}).$mount('#app');
