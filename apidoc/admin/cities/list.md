# CITIES LIST
-----------

## Request

    GET /api/v1/cities/

```parameters
search    : 'search string',
latlng    : 'latitude,longitude',
limit     : integer 1 to 20
```

## Response

```JSON5

    {
        "status": 1,
        "data": {
            "data": [
                {
                    "id": 703448,
                    "label": "Kyiv",
                    "value": "50.45466, 30.5238",
                    "country": "UA"
                }//,...
            ]
        }
    }

```