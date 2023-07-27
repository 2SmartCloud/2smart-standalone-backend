# CREATE SCREEN
-------------

## Request

    POST /api/v1/screens

```JSON5

    {
        "data": {
            "position" : 2
        }
    }

```

## Response

```JSON5

    {
        "status": 1,
        "data": {
            "id"       : "6e144282-dc73-4d15-ada1-8f7d9f1a3b38",
            "name"     : "My screen 2",
            "position" : 2,
            "count"    : 2,
            "layout"   : {},
            "widgets"  : []
        }
    }

```