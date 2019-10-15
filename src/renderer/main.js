import Vue from 'vue'

import {
  Collapse,
  CollapseItem,
  Container,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

import App from './App'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

// configure language
locale.use(lang)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Main)

/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  template: '<App/>'
}).$mount('#app')
