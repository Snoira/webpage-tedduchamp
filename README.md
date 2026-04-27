# Officiall website for Ted Duchamp

Uses NextJS framework and Sanity for headless CMS. 
## Functionality
Sections and events can be added and modified through Sanity. Website uses dynamic preview: Preview button in studio triggers "draft mode" and opens a window where drafts can me seen on the website before they're published. 

## Website anatomy
Website is currently only one page where the content is divided and added through sections: 
- Hero section is edited through the Intro schematype/sanity object.
- Event section lists bands upcomming shows. It contains eventcards which can be added and modified through the events schematype/sanity object.
- Contact form is the only section not connected to Sanity. Form uses [web3forms api](https://docs.web3forms.com/) to send form submissions to the bands email. Needs WEB3FORMS_ACCESS_KEY which is retrieved from website. 
-  "Section" sections can be used to add content like an about text or images to the website. These can be added and edited through the section schematype/sanity object. The styling changes depending on the section content:
    - only text, the font will be large and eyecatching
    - only images, will show up in a grid
    - image and text will show up side by side (or above and below each other on mobile) and the text is smaller.

### Related docs
[Notion](https://www.notion.so/Ted-Duchamp-29432c6b4a6c807aa06ae020a6715b87)
[Figma](https://www.figma.com/design/3wP1Coz7NQVKSzeYWQkm4w/Ted-Duchamp?t=0hQzlnVKMJet710X-0)



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
