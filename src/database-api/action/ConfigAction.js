import {Controller, Get} from "@/database-api/action/BaseAction"

@Controller({name: 'config'})
class ConfigAction {

  @Get('hello')
  findConfig() {
    console.log('findConfig')
  }

  @Get
  findConfig1() {
    console.log('findConfig1')
  }

}

export default ConfigAction
