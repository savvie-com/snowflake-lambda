import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import snowflake from 'snowflake-sdk';

console.time('connection time');
const connection = snowflake.createConnection({
    account: 'account',
    username: 'username',
    password: 'password',
    database: 'database',
    schema: 'schema',
    warehouse: 'warehouse',
});
connection.connect(function (err, conn) {
    if (err) {
        console.error('Unable to connect: ' + err.message);
    } else {
        console.log('Successfully connected to Snowflake.');
        // Optional: store the connection ID.
        // connection_ID = conn.getId()
        console.log('conn.getId(): ', conn.getId());
    }
});
console.timeEnd('connection time');

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'hello world',
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};
