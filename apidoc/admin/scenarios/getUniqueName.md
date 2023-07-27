# SCENARIOS GET UNIQUE NAME
-----------

## Request

    GET /api/v1/scenariosUniqueName

### query parameters
```
mode      : 'ADVANCED' or 'SIMPLE',
type      : '@2smart/watering-schedule' or 'null'(in case of advanced scenarios)
```


## Response

```JSON5

    {
        "status": 1,
        "data": {
            "name"      : "watering-schedule-1",
        },
    }

```