# CHANGE USERS PIN
-------------
Запрос должен быть авторизованым логином и паролей("x-access-token" header должен быть равным jwt-токену).
## Request

    POST /api/v1/users/pin

```JSON5

    {
        "data": {
            pin: "PIN",
            pinConfirm: "PIN"
        }
    }

```

## Response

```JSON5

    {
        "status": 1,
        "data": {}
    }

```