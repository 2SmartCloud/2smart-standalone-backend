# UPDATE SETTINGS
-------------
Запрос должен быть авторизованым логином и паролей("x-access-token" header должен быть равным jwt-токену).
## Request

    POST /api/v1/settings

```JSON5

    {
        "data": {
            // set of key/value pairs.
        }
    }

```

## Response

```JSON5

    {
        "status": 1,
        "data": {
            //set of key/value pairs, which were updated
        }
    }

```

при запросе на измеенение secure_mode_enabled=true, если у пользователя нету пина - вернет ошибку:
## Response

```JSON5

    {
        "status": 0,
        "error": { fields: {}, code: 'USER_HAS_NO_PIN' }
    }

```