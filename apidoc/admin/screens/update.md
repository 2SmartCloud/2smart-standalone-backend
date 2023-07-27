# UPDATE SCREEN
-------------

## Request

    PUT /api/v1/screens/:id

```JSON5

    {
        "data": {
            "name"   : "screen name",
            "layout" : {
                "lg" : [],
                "sm" : [{
                    "w"      : 1,
                    "h"      : 1,
                    "x"      : 0,
                    "y"      : 0,
                    "i"      : "710d4a71-f53a-4137-aa61-d20964255a02",
                    "moved"  : false,
                    "static" : false
                }]
            }
        }
    }

```

## Response

```JSON5

    {
        "status" : 1,
        "data"   : {
            "id"       : "0710a1d9-1a7f-4dae-8c8a-e0f8e70941d5",
            "name"     : "screen name",
            "position" : 1,
            "count"    : 1,
            "layout"   : {
                "lg" : [],
                "sm" : [{
                    "w"      : 1,
                    "h"      : 1,
                    "x"      : 0,
                    "y"      : 0,
                    "i"      : "710d4a71-f53a-4137-aa61-d20964255a02",
                    "moved"  : false,
                    "static" : false
                }]
            },
            "widgets" : [{}]
        }
    }

```