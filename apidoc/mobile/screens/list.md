# SCREENS LIST
-----------

Returns a list of screens without additional info such as widgets and topics

## Request

    GET /api/mobile/v1/screens/

## Response

```JSON5

{
  "status": 1,
  "data": {
    "screens": [
      {
        "id": 1,
        "title": "My screen 1",
        "parentControl": true
      },
      {
        "id": 2,
        "title": "My screen 2",
        "parentControl": true
      }
    ]
  }
}

```
