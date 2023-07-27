# CREATE SESSION
-------------

Для создания авторизованого запроса нужно добавить x-access-token header с токеном

## Request

    POST /api/v1/sessions

```JSON5

    {
        "data": {
            "token" : "SIGNED_DATA_TOKEN"
        }
    }

```
or
```JSON5

    {
        "data": {
            "pin" : "PIN"
        }
    }

```
or
```JSON5

    {
        "data": {
            "username" : "admin",
            "password" : "2Smart",
        }
    }

```

## Response

```JSON5

    {
        "status": 1,
        "data": {
            "accessToken" : "SIGNED_DATA_TOKEN",
        }
    }

```

В случае ошибки может вернуть:
## Response

```JSON5

    {
        "status": 0,
        "error": { fields: {}, code: 'TOKEN_EXPIRED' }
    }

```
или
## Response

```JSON5

    {
        "status": 0,
        "error": { fields: {}, code: 'INVALID_SIGNATURE' }
    }
```
или
## Response

```JSON5

    {
        "status": 0,
        "error": { fields: {}, code: 'INVALID_TOKEN' }
    }

```
или
## Response

```JSON5

    {
        "status": 0,
        "error": { fields: {}, code: 'BAD_CREDENTIALS' }
    }

```