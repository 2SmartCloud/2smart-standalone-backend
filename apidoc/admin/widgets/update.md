# UPDATE WIDGET
-----------

## Request

    PUT /api/v1/widgets/:id

```JSON5

    {
        "data" : {
            "deviceId"     : "yahoo-weather",
            "nodeId"       : null,
            "hardwareType" : "device",
            "propertyType" : "telemetry",
            "propertyId"   : "signal",
            "topic"        : "sweet-home/yahoo-weather/$telemetry/signal",
            "value"        : "sweet-home/yahoo-weather/$telemetry/signal",
            "label"        : "sweet-home/yahoo-weather/$telemetry/signal",
            "type"         : "string",
            "name"         : "aasdf",
            "bgColor"      : "#D1EBFF",
            "screen"       : "0710a1d9-1a7f-4dae-8c8a-e0f8e70941d5"
        }
    }

```

## Response

```JSON5

    {
        "status" : 1,
        "data"   : {
            "id"        : "6e144282-dc73-4d15-ada1-8f7d9f1a3b38",
            "name"      : "my_scebnario_1",
            "title"     : "My scenario title",
            "mode"      : "ADVANCED",// 'ADVANCED' or 'SIMPLE'
            "language"  : "JS",// 'JS'
            "status"    : "ACTIVE",//'ACTIVE' or 'INACTIVE'
            "createdAt" : "createdAt",
            "updatedAt" : "updatedAt"
        }
    }

```