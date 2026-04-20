import { Rule } from "sanity";

const siteSettings = {
  name: "siteSettings",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
      validation: (rule: Rule) => rule.max(60),
    },
    {
      name: "description",
      type: "text",
      description:
        "Kort beskrivning av bandet för SEO och tillgänglighet. Syns ej på sidan, ses bara av screenreaders.",
      validation: (rule: Rule) => rule.max(160),
    },
    {
      name: "seo",
      type: "object",
      description:
        "Här ändras innehåller som syns när hemsidan visas på google och delas på sociala medier. Bör innehålla nyckelord!",
      groups: [
        {
          name: "google",
          title: "Google",
          default: true,
        },
        {
          name: "openGraph",
          title: "Social Media",
        },
      ],
      fields: [
        {
          name: "title",
          description: "Ses på hemside-fliken (taben) och google searches.",
          type: "string",
          group: "google",
          validation: (rule: Rule) => rule.max(60),
        },
        {
          name: "description",
          description:
            "Texten som ses under hemsidans titel i google searches.",
          type: "text",
          group: "google",
          validation: (rule: Rule) => rule.max(160),
        },
        {
          name: "ogTitle",
          title: "Social Media Title",
          type: "string",
          group: "openGraph",
          validation: (rule: Rule) => rule.max(60),
        },
        {
          name: "ogDescription",
          title: "Social Media Description",
          type: "text",
          group: "openGraph",
          validation: (rule: Rule) => rule.max(160),
        },
        {
          name: "ogImage",
          title: "Social Media Image",
          description:
            "Bilden som visas när hemsidan delas på sociala medier. Optimal size 1200*630 pixels, supported formats JPEG, PNG and GIF",
          type: "image",
          options: { hotspot: true },
          group: "openGraph",
        },
      ],
    },
    //todo: lägg till socialLinks, favicon, logo and kontaktmail senare.
    //göra till singleton? https://www.sanity.io/guides/singleton-document
  ],
};

export default siteSettings;
