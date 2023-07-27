# CHANGE USERS PIN
-------------
Запрос должен быть авторизованым логином и паролей("x-access-token" header должен быть равным jwt-токену).
## Request

    PUT /api/v1/users/me
username и поля для пароля обрабатываются сепарабельно.
Поле username - становится обязательным и идет проверка его валидности и обработка только если оно не приводится к false
Група полей для пароля - становится обязательными только если хотя бы одно поле из групы указано(не приводится к false)

```JSON5

    {
        "data": {
            username: "new_username",     // ',string', { 'min_length': 1 }, { 'like': '^[a-z0-9_]+$' }
            oldPassword: "oldPassword",   // 'string'
            newPassword: "newPassword",   // 'string', { 'min_length': 5 }
            newPasswordConfirm: "newPasswordConfirm"    //'string', { 'equal_to_field': [ 'newPassword' ] }
        }
    }

```
Так как токен привязан к паролю. А значит сбрасывается при изменении пароля. Значит токен пользователя надо обновить при смене пароля.
## Response

```JSON5

    {
        "status": 1,
        "data": {
          pin: true, //true if set, false if user has no pin.
          username: "2smart",
          newToken: "new token"
        }
    }

```