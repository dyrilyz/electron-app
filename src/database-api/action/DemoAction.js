import {Controller, Get} from "@/database-api/action/BaseAction"

@Controller({name: 'demo'})
class DemoAction {

  @Get('..')
  findDemo() {
    console.log('findDemo')
  }

  @Get
  findDemo1(req, resp) {
    console.log('haha,findDemo1,req is', resp)
  }

}

new DemoAction().findDemo1({id: 'haha', name: 'hello'})

export default DemoAction
