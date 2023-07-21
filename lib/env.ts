import { z } from "zod";

const env = z
  .object({
    awsAccessKeyId: z.string().nonempty(),
    awsSecretAccessKey: z.string().nonempty(),
    awsRegion: z.string().nonempty(),
    googleClientId: z.string().nonempty(),
    googleClientSecret: z.string().nonempty(),
    vercelEnv: z.string().default("localhost"),
  })
  .parse({
    awsAccessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
    awsSecretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY,
    awsRegion: process.env.NEXT_AUTH_AWS_REGION,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    vercelEnv: process.env.VERCEL_ENV,
  });

export default env;
