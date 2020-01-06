const Actions = []

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

export function Get(target, name, descriptor) {
  Actions.push({
    class: target.constructor,
    Get: name
  })
  console.log('Get')
  const oldValue = descriptor.value
  descriptor.value = function (...args) {
    console.log('descriptor', ...args)
    return oldValue.apply(this, arguments)
  }
  return descriptor
}

export function Post(target, name) {
  Actions.push({
    class: target.constructor,
    Post: name
  })
  console.log('Post')
}

export default Actions