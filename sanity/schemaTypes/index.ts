import { type SchemaTypeDefinition } from 'sanity'
import intro from './intro.schemaType'
import events from './events.schemaType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [intro, events],
}
