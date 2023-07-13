import type { Config } from "prismic-ts-codegen";

const config: Config = {
  output: "./types.generated.ts",
  models: ["./customtypes/**/index.json", "./slices/**/model.json"],
  fields: {
    integrationFields: {
      catalogTypes: {
        id: "string",
      },
    },
  },
};

export default config;
