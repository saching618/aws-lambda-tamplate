### Local development
This lambda is based on serverless frame work
to install serverless 
```bash
npm install -g serveless
```
inside typescript folder run
```bash
npm install
```
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