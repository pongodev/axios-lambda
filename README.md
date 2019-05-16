# axios-for-aws

Axios for AWS is a library which helps you to proxy an event of API Gateway of AWS using Axios. It can be used on your lambda functions using node.js 8.

## How to install 

`$ npm install axios-for-aws --save`

or

`$ yarn add axios-for-aws`

## Example

```javascript
import { axiosLambda } from 'axios-for-aws'

export async function handler(awsEvent, context) {
  const { path = '', body } = awsEvent

    const target = "http://dummydomain.com/${path}";
    const axiosConfiguration = { host: `<domain>`, body };

    return axiosLambda(awsEvent, target, axiosConfiguration)
        .then((response) => {
            const body = JSON.stringify(response.data);

            return { 'statusCode': response.status, 'body': body, 'headers': response.headers, 'config': response.config };
        })
        .catch((err) => {
            return (err.code === 'ENOTFOUND') 
                ? defaultResponses.notFound
                : { 'statusCode': err.response.status, 'body': err.response.data, 'headers': err.response.headers };
    });
}
```