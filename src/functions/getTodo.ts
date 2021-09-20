import { APIGatewayProxyHandler } from 'aws-lambda';

import { document  } from '../utils/dynamodbClient';

export const handle: APIGatewayProxyHandler = async (event) => { 

  const { id } = event.pathParameters;

  const response = await document.query({
    TableName: "users_todos",
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ":id": id
    }
  }).promise();

  const userTodo = response.Items[0];

  if(userTodo) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Todo",
        Todo: userTodo,
      })
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "User invalid!"
    })
  }
}