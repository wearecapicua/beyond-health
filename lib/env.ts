import { SafeParseReturnType, z } from "zod";

const clientEnv = z.object({
  stripePublicKey: z.string().nonempty(),
});

const serverEnv = z.object({
  awsAccessKeyId: z.string().nonempty(),
  awsSecretAccessKey: z.string().nonempty(),
  awsRegion: z.string().nonempty(),
  googleClientId: z.string().nonempty(),
  googleClientSecret: z.string().nonempty(),
  stripeSecretKey: z.string().nonempty(),
  stripeWebhookSecret: z.string().nonempty(),
  vercelEnv: z.string().default("localhost"),
  host: z.string().default("http://localhost:3000"),
});

const mergedEnv = serverEnv.merge(clientEnv);

let env: z.infer<typeof mergedEnv>;

const isServer = typeof window === "undefined";

const processEnv: Record<
  keyof z.infer<typeof serverEnv> | keyof z.infer<typeof clientEnv>,
  string | undefined
> = {
  awsAccessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
  awsSecretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY,
  awsRegion: process.env.NEXT_AUTH_AWS_REGION,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  vercelEnv: process.env.VERCEL_ENV,
  host: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined
};
type MergedInput = z.input<typeof mergedEnv>;
type MergedOutput = z.infer<typeof mergedEnv>;
type ParsedEnv = z.SafeParseReturnType<MergedInput, MergedOutput>;
const parsed = (
  isServer
    ? // on server we can validate all env vars
      mergedEnv.safeParse(processEnv)
    : // on client we can only validate the ones that are exposed
      clientEnv.safeParse(processEnv)
) as ParsedEnv;
if (parsed.success === false) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables");
}

env = new Proxy(parsed.data, {
  get(target, prop) {
    if (typeof prop !== "string") return undefined;
    // Throw a descriptive error if a server-side env var is accessed on the client
    // Otherwise it would just be returning `undefined` and be annoying to debug
    if (!isServer && !prop.toLowerCase().includes("public"))
      throw new Error(
        `❌ Attempted to access server-side environment variable '${prop}' on the client`
      );
    return target[prop as keyof typeof target];
  },
});

export default env;
