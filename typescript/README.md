### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local -f transaction --data '{"body":"{\n    \"payment_gateway_provider_id\": 3,\n    \"email\": \"testtech@tech.edureka.in\",\n    \"gateway_currency\": \"USD\",\n    \"gateway_amount\": 1000,\n    \"gateway_payment_id\": \"usdPavfgymnjvm\",\n    \"gateway_created\": \"2021-06-15 12:46:09\"\n}","headers":{"authentication_data":"ZOHO_BOOK_PAYMENT_SERVICE"}}'
```

Which should result in response similar to the following:

```
{
    "statusCode": 200,
    "body": "{\"data\":\"270840500000XXXXX\",\"message\":\"Success\"}"
}
```