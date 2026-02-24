export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-12-15";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);
export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const formAccessKey = assertValue(
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
  "Missing environment variable: NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY"
);

export const revalidateSecret = assertServerValue(
  process.env.REVALIDATE_SECRET,
  "Missing environment variable: REVALIDATE_SECRET"
);

export const sanityReadToken = assertServerValue(
  process.env.SANITY_READ_TOKEN,
  "Missing environment variable: SANITY_READ_TOKEN"
);

const nodeEnv = process.env.NODE_ENV;
const deployContext = process.env.CONTEXT;

export const environment = (() => {
  if (nodeEnv === "production") {
    return "production";
  }
  if (deployContext === "deploy-preview" || deployContext === "branch-deploy") {
    return "preview";
  }
  return "development";
})();

export const urls = {
  development: "http://localhost:3000",
  preview: "https://dev--tedduchampband.netlify.app/",
  production: "https://tedduchamp.com/",
};

export const currentSiteUrl = (() => {
  return urls[environment];
})();

export const isPreview = environment === "preview";

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}

function assertServerValue<T>(v: T | undefined, errorMessage: string): T {
  if (typeof window !== "undefined") {
    return undefined as T;
  }
  return assertValue(v, errorMessage);
}
