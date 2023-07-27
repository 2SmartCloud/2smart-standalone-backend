# CHANGE USERS PIN
-------------
Запрос должен быть авторизованым логином и паролей("x-access-token" header должен быть равным jwt-токену).
## Request

    POST /api/v1/users/resetPassword

```JSON5

    {
        "data": {
            oldPassword: "oldPassword",
            newPassword: "newPassword",
            newPasswordConfirm: "newPasswordConfirm"
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