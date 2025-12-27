import { Rule } from "sanity";

const sections = {
    name: "sections",
    title: "Sections",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Section Title",
            type: "string",
            description: "A unique name for this section (will be shown in the nav), does not need to match the Section heading.",
        },
        {
            name: "heading",
            title: "Heading",
            type: "string",
            description: "The heading that will be displayed at the top of this section on the website. Not required to match the Section name.",
        },
        {
            name: "slug",
            title: "Section Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "textContent",
            title: "Text Content",
            type: "array",
            of: [{ type: "block" }],
        },
        {
            name: "images",
            title: "Images",
            type: "array",
            of: [{ type: "image", options: { hotspot: true } }],
        },
    ],
}

export default sections;