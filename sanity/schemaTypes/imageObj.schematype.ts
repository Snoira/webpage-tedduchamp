import { Rule } from "sanity";
const imageObj = {
  name: "imageObj",
  type: "image",
  options: { hotspot: true },
  fields: [
    {
      name: "alt",
      type: "string",
      title: "Alt text",
      validation: (rule: Rule) =>
        rule.required().error("Alt text is required for SEO"),
    },
    { name: "caption", type: "string", title: "Caption" },
  ],
};

export default imageObj;
