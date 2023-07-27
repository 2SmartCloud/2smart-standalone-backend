# CHANGE USERS PIN
-------------

## Request

    GET /api/v1/users/info

## Response

```JSON5

    {
        "status": 1,
        "data": {
          pin: true, //true if set, false if user has no pin.
          username: "2smart"
        }
    }

```