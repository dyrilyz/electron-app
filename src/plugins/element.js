import Vue from 'vue'
import {
  Button,
  Dialog,
  Form,
  FormItem,
  Input,
  Row,
  Col,
  Message,
  MessageBox,
  Alert,
  Table,
  TableColumn,
  Link,
} from 'element-ui'

Vue.use(Button)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Alert)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Link)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
