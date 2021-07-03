### Local development
#### Installing Node.js

#### Serverless is a Node.js CLI tool so the first thing you need to do is to install Node.js on your machine.

Go to the official Node.js website, download and follow the installation instructions to install Node.js on your local machine.

Note: Serverless runs on Node v6 or higher.

You can verify that Node.js is installed successfully by running node --version in your terminal. You should see the corresponding Node version number printed out.

Installing the Serverless Framework

Next, install the Serverless Framework via npm which was already installed when you installed Node.js.

Open up a terminal and type npm install -g serverless to install Serverless.

```bash
npm install -g serverless
```

Once the installation process is done you can verify that Serverless is installed successfully by running the following command in your terminal:

serverless

To see which version of serverless you have installed run:

```bash
serverless --version
```

inside typescript folder run
```bash
npm install
```

#### Redis Set Method
You can invoke your function locally by using the following command inside typescipt folder:

```bash
serverless invoke local -f redisset --data '{"body":"{\n     \"key\": \"user_email\",\n    \"value\": \"email@example.com\"}","headers":{"authentication_data":"redis_auth_permission"}}'
```

Which should result in response similar to the following:

```
{
    "statusCode": 200,
    "body": "{\"data\":true,\"message\":\"success\"}"
}
```

#### Redis Get Method
You can invoke your function locally by using the following command inside typescipt folder:

```bash
serverless invoke local -f redisget --data '{"body":"{\n     \"key\": \"user_email\"}","headers":{"authentication_data":"redis_auth_permission"}}'
```

Which should result in response similar to the following:

```
{
    "statusCode": 200,
    "body": "{\"data\":\"null\",\"message\":\"success\"}"
}
OR 
{
    "statusCode": 200,
    "body": "{\"data\":\"email@example.com\",\"message\":\"success\"}"
}
```


#### Redis DEL Method
You can invoke your function locally by using the following command inside typescipt folder:

```bash
serverless invoke local -f redisgdel --data '{"body":"{\n     \"key\": \"user_email\"}","headers":{"authentication_data":"redis_auth_permission"}}'
```

Which should result in response similar to the following:

```
if key is not present in redis
{
    "statusCode": 200,
    "body": "{\"data\":0,\"message\":\"success\"}"
}
OR 
if key is present in redis
{
    "statusCode": 200,
    "body": "{\"data\":1,\"message\":\"success\"}"
}
```

