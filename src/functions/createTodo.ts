import { APIGatewayProxyHandler } from 'aws-lambda';

import { document  } from '../utils/dynamodbClient';
import { v4 as uuidV4 } from 'uuid';

interface ICreateTodo {
  title: string;
  deadline: Date;
}


export const handle: APIGatewayProxyHandler = async (event) => {
  
  const { id } = event.pathParameters;

  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

   await document.put({
    TableName: "users_todos",
    Item: {
      id: uuidV4(),
      user_id: id,
      title,
      done: false,
      deadline
    }
  }).promise();

 return{ 
   statusCode: 201,
   body: JSON.stringify({
     message: "Todo created!",
   }),
   headers: {
     "Content-type": "application/json",
   },
  };
} 