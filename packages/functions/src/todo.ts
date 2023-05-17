import * as uuid from "uuid";
import { ApiHandler } from "sst/node/api";
import { Time } from "@my-sst-app/core/time";
import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";

const dynamoDb = new DynamoDB.DocumentClient();

export const findAll = ApiHandler(async () => {
  const params = {
    TableName: Table.TODO.tableName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": "123",
    },
  };
  const response = await dynamoDb.query(params).promise();

  return {
    body: response,
  };
});

export const create = ApiHandler(async (event) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: Table.TODO.tableName,
    Item: {
      userId: "123",
      todoId: uuid.v1(),
      title: data.title,
    },
  };
  await dynamoDb.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(params.Item),
  };
});

export const findOne = ApiHandler(async (event) => {
  return {
    body: `This is the findOne endpoint. The id is ${event.pathParameters?.id}`,
  };
});

export const update = ApiHandler(async (event) => {
  return {
    body: `This is the update endpoint. The id is ${event.pathParameters?.id}`,
  };
});

export const deleteOne = ApiHandler(async (event) => {
  return {
    body: `This is the deleteOne endpoint. The id is ${event.pathParameters?.id}`,
  };
});
