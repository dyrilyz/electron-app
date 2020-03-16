import Vue from 'vue'
import {
  Button,
  Dialog,
  Form,
  FormItem,
  Input,
  Message,
  Loading,
} from 'element-ui'

Vue.use(Button)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Loading.directive)

Vue.prototype.$message = Message
