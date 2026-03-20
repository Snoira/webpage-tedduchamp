import { type SchemaTypeDefinition } from "sanity";
import intro from "@/sanity/schemaTypes/intro.schemaType";
import events from "@/sanity/schemaTypes/events.schemaType";
import sections from "@/sanity/schemaTypes/sections.schemaType";
import siteSettings from "@/sanity/schemaTypes/siteSettings.schemaType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [intro, events, sections, siteSettings],
};
