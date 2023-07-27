# USERS SHOW MQTT CREDENTIALS
-----------

Returns credentials for connection to MQTT broker

## Request

    GET /api/mobile/v1/users/mqtt


## Response

```JSON5

    {
        "status" : 1,
        "data"   : {
            "url"      : "ws://localhost/mqtt",
            "username" : "mqtt-username",
            "password" : "mqtt-password"
        },
    }

```
