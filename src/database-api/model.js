import {Model, Field} from "@/database-api/decorator"

export const ConfigIfc = new Model([
  new Field({
    fieldName: 'key',
    type: String,
    required: true,
  })
])