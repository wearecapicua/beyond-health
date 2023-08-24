// import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
// import { NextApiRequest, NextApiResponse } from "next";
// import env from "lib/env";

// const dynamoClient = new DynamoDBClient({ region: env.awsRegion });
// const tableName = `${env.vercelEnv}-beyond-health-users`;

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     const { userId, jotformId } = req.body;

//     const command = new UpdateItemCommand({
//       TableName: tableName,
//       Key: {
//         pk: { S: `USER#${userId}` }
//       },
//       UpdateExpression: "set jotformId = :jotformId",
//       ExpressionAttributeValues: {
//         ":jotformId": { S: jotformId },
//       },
//       ReturnValues: "ALL_NEW",
//     });

//     try {
//       const response = await dynamoClient.send(command);
//       console.log({response})
//       res.status(200).json(response);
//     } catch (error) {
//       console.error("Error updating jotformId:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// };


import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";
import env from "lib/env";

const dynamoClient = new DynamoDBClient({ region: env.awsRegion });
const tableName = `${env.vercelEnv}-beyond-health-users`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { userId, jotformId } = req.body;

    const command = new UpdateItemCommand({
      TableName: tableName,
      Key: {
        pk: { S: `USER#${userId}` }
      },
      UpdateExpression: "set jotformId = :jotformId",
      ExpressionAttributeValues: {
        ":jotformId": { S: jotformId },
      },
      ReturnValues: "ALL_NEW",
    });

    try {
      console.log("Sending DynamoDB update command:", command);
      const response = await dynamoClient.send(command);
      console.log("DynamoDB response:", response);
      res.status(200).json(response);
    } catch (error) {
      console.error("Error updating jotformId:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};