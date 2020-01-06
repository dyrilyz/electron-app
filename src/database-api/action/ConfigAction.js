import {Controller, Get, Post} from "@/database-api/action/BaseAction"

@Controller({name: 'config'})
class ConfigAction {

  @Get
  findConfig() {
    console.log('findConfig')
  }

  @Post
  findConfig1() {
    console.log('findConfig1')
  }

}

export default ConfigAction
