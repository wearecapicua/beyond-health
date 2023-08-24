// import {
//   DynamoDB,
//   DynamoDBClientConfig,
//   ListTablesCommand,
// } from "@aws-sdk/client-dynamodb";
// import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { DynamoDBAdapter } from "@auth/dynamodb-adapter";
// import { DefaultAdapter } from "next-auth/adapters";
// import env from "lib/env";

// const config: DynamoDBClientConfig = {
//   credentials: {
//     accessKeyId: env.awsAccessKeyId,
//     secretAccessKey: env.awsSecretAccessKey,
//   },
//   region: env.awsRegion,
// };

// const client = DynamoDBDocument.from(new DynamoDB(config), {
//   marshallOptions: {
//     convertEmptyValues: true,
//     removeUndefinedValues: true,
//     convertClassInstanceToMap: true,
//   },
// });

// const tableName = `${env.vercelEnv}-beyond-health-users`;

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: env.googleClientId,
//       clientSecret: env.googleClientSecret,
//     }),
//   ],
//   adapter: DynamoDBAdapter(client, {
//     tableName,
//   }) as DefaultAdapter,
// };

// export default NextAuth(authOptions);


import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';

import {
  DynamoDB,
  DynamoDBClientConfig,
  ListTablesCommand,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import GoogleProvider from "next-auth/providers/google";
import { DynamoDBAdapter } from "@auth/dynamodb-adapter";
import { DefaultAdapter } from "next-auth/adapters";
import env from "lib/env";

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: env.awsAccessKeyId,
    secretAccessKey: env.awsSecretAccessKey,
  },
  region: env.awsRegion,
};

const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

const tableName = `${env.vercelEnv}-beyond-health-users`;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: env.googleClientId,
      clientSecret: env.googleClientSecret,
    }),
  ],
  adapter: DynamoDBAdapter(client, {
    tableName,
  }) as DefaultAdapter,
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  NextAuth(req, res, authOptions); // Pass both req and res objects to NextAuth
};