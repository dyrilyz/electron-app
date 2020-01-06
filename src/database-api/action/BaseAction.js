const Actions = []

class Result {
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

export function Controller(args1) {
  return function (args2) {
    const obj = {}
    if (args2) {
      Object.assign(obj, {class: args2}, args1)
    } else {
      Object.assign(obj, {class: args1})
    }
    for (const action of Actions) {
      if (action.class === obj.class) {
        Object.assign(action, obj)
      }
    }
    console.log('Controller', obj)
  }
}

export function Get(...args) {
  function decorator(target, name, descriptor) {
    const [Action] = Actions.filter(item => item.class === target.constructor)
    if (!Action) {
      Actions.push({
        class: target.constructor,
        Get: name
      })
    }
    const oldValue = descriptor.value
    descriptor.value = function (params) {
      const req = {params}
      const resp = {
        success(obj) {
          return new Result(obj)
        },
        fail(message) {
          return Result.Fail(message)
        }
      }
      return oldValue.call(this, req, resp)
    }
    return descriptor
  }

  if (args.length === 1) {
    return function (target, name, descriptor) {
      const [Action] = Actions.filter(item => item.class === target.constructor)
      if (!Action) {
        Actions.push({
          class: target.constructor,
          Get: name
        })
      }
      return decorator(target, name, descriptor)
    }
  } else if (args.length === 3) {
    const [target, name, descriptor] = args
    // const [Action] = Actions.filter(item => item.class === target.constructor)
    return decorator(target, name, descriptor)
  }
}

export function Post(target, name) {
  Actions.push({
    class: target.constructor,
    Post: name
  })
  console.log('Post')
}

export default Actions
