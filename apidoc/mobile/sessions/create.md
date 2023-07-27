# CREATE SESSION
-------------

## Request

    POST /api/mobile/v1/sessions

```JSON5

    {
        "username" : "admin",
        "password" : "2Smart",
    }

```

## Response

```JSON5

    {
        "status": 1,
        "data": {
            "jwt" : "ekJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYxNTgxMjEwNX0.YMoWzZepDHbqrwLsK3UjHXg2mWffaEvulMj31-G2yuA",
        }
    }

```

В случае ошибки может вернуть:
## Response

```JSON5

    {
        "status": 0,
        "error": {
            "type"    : 'validation',
            "code"    : 'INVALID_CREDENTIALS',
            "message" : 'Invalid username or password',
            "errors"  : []
        }
    }

```
