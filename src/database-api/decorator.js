function handleModelValidate(target, name, descriptor) {
  console.log(target, name, descriptor)
}

export function ModelValidate(ifc: string) {
  if (!(ifc instanceof Interface)) {
    throw Error('类型错误')
  } else {
    return handleModelValidate
  }
}

export class Interface {
  constructor(...fields) {
    fields.forEach(field => {
      if (!(field instanceof Field)) {
        throw Error(`${field} is not 'Field' instance`)
      }
    })
  }
}

export class Field {
  constructor(obj) {
    const {
      fieldName,
      type = [Object],
      pattern,
      required = false,
      max,
      min,
    } = obj

    this.fieldName = fieldName
    this.type = type
    this.required = required
    this.pattern = pattern
    this.max = max
    this.min = min
  }
}