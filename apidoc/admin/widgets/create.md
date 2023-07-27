# CREATE WIDGET
-------------

## Request

    POST /api/v1/widgets

```JSON5

    {
        "data" : {
            "deviceId"     : "yahoo-weather",
            "nodeId"       : null,
            "hardwareType" : "device",
            "propertyType" : "telemetry",
            "propertyId"   : "battery",
            "topic"        : "sweet-home/yahoo-weather/$telemetry/battery",
            "value"        : "sweet-home/yahoo-weather/$telemetry/battery",
            "label"        : "sweet-home/yahoo-weather/$telemetry/battery",
            "type"         : "number",
            "bgColor"      : "#FFEBF7",
            "name"         : "name",
            "screen"       : "0710a1d9-1a7f-4dae-8c8a-e0f8e70941d5"
        }
    }

```

## Response

```JSON5

    {
        "status" : 1,
        "data"   : {
            "id"           : "bfb072cc-9a71-4858-b394-01f72b3413d8",
            "type"         : "number",
            "topic"        : "sweet-home/yahoo-weather/$telemetry/battery",
            "name"         : "name",
            "nodeId"       : null,
            "deviceId"     : "yahoo-weather",
            "hardwareType" : "device",
            "propertyType" : "telemetry",
            "propertyId"   : "battery",
            "bgColor"      : "#FFEBF7"
        }
    }

```