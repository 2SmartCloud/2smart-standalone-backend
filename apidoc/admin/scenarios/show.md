# SCENARIOS SHOW
-----------

## Request

    GET /api/v1/scenarios/:id


## Response

```JSON5

    {
        "status": 1,
        "data": {
            "id"        : "6e144282-dc73-4d15-ada1-8f7d9f1a3b38",
            "name"      : "my_scebnario_1",
            "title"     : "My scenario title",
            "mode"      : "ADVANCED",// 'ADVANCED' or 'SIMPLE'
            "script"    : "echo 'hello';",
            "language"  : "JS",// 'JS'
            "status"    : "ACTIVE",//'ACTIVE' or 'INACTIVE'
            "createdAt" : "createdAt",
            "updatedAt" : "updatedAt"
        },
    }

```