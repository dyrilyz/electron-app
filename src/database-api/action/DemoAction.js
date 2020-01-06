import {Controller, Get} from "@/database-api/action/BaseAction"

@Controller({name: 'demo'})
class DemoAction {

  @Get
  findDemo() {
    console.log('findDemo')
  }

  @Get
  findDemo1() {
    console.log('haha,findDemo1')
  }

}

new DemoAction().findDemo1('123', 'hello')

export default DemoAction
