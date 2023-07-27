# SCREENS SHOW
-----------

Returns whole info about a screen including widgets and its topics

## Request

    GET /api/mobile/v1/screens/:id

## Response

```JSON5
{
  "status": 1,
  "data": {
    "id": 1,
    "title": "My screen 1",
    "widgets": [
      {
        "id": "1",
        "topics": [
          "sweet-home/m4ycz0sd8ps9xbvyey8m/$options/location"
        ],
        "type": "string",
        "name": "widget-name",
        "advanced": {}
      }
    ],
    "parentControl": true
  }
}
```
