import {Interface, Field} from "@/database-api/decorator"

export const ConfigIfc = new Interface([
  new Field({
    fieldName: 'key',
    type: String,
    required: true,
  })
])