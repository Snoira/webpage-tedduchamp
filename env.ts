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
const netlifyContext = process.env.CONTEXT;

type Environment = "development" | "preview" | "production";

export const environment: Environment = (() => {
  if (
    netlifyContext === "branch-deploy" ||
    netlifyContext === "deploy-preview" ||
    (nodeEnv === "production" && !netlifyContext)
  ) {
    return "preview";
  }
  if (nodeEnv === "production") {
    return "production";
  }
  return "development";
})();

export const urls: Record<Environment, string> = {
  development: "http://localhost:3000",
  preview: "https://dev--tedduchampband.netlify.app",
  production: "https://tedduchamp.com",
};

export const siteUrl = (() => {
  return urls[environment];
})();

console.log("ENVIRONMENT: ", environment, "SITEURL: ", siteUrl);

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
