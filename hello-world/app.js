const { Client } = require("pg");
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    const client = new Client({
      user: "postgres",
      host: "localhost",
      password: "martzcodesshouldhaveabetterpassword"
    });
    await client.connect();
    const res = await client.query("SELECT * from hello_table ORDER BY id DESC LIMIT 1");
    const hello = `${res.rows[0].hello_source} says hello to ${res.rows[0].hello_target}`;
    console.log(hello); // Shows "Matt says hello to Whit""
    await client.end();
    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: hello,
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
