export default class Result {
  constructor(opt) {
    const {success = true, result = '', message = ''} = opt
    this.success = success
    this.result = result
    this.message = message
  }

  static Fail(message) {
    return new Result({success: false, message})
  }
}