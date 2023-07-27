# SCENARIOS LIST
-----------

## Request

    GET /api/v1/scenarios/

```parameters
mode      : 'ADVANCED' or 'SIMPLE',
status    : 'ACTIVE' or 'INACTIVE',
language  : 'JS',
search    : 'search string',
sortBy    : 'createdAt', 'updatedAt', 'name', 'title', 'mode', 'status', 'language'. Default sort field is 'createdAt'(DESC)
sortOrder : 'ASC' or 'DESC', deafault: ASC
limit     : integer 1 to 50,
offset    : offset, 0 to +inf
```

## Response

```JSON5

    {
        "status": 1,
        "data": [
            {
                "id"        : "6e144282-dc73-4d15-ada1-8f7d9f1a3b38",
                "name"      : "my_scebnario_1",
                "title"     : "My scenario title",
                "mode"      : "ADVANCED",// 'ADVANCED' or 'SIMPLE'
                "language"  : "JS",// 'JS'
                "status"    : "ACTIVE",//'ACTIVE' or 'INACTIVE'
                "createdAt" : "createdAt",
                "updatedAt" : "updatedAt"
            },
            {
                "id"        : "6e144282-dc73-4d15-ada1-8f7d9f1a3b38",
                "name"      : "my_scebnario_1",
                "title"     : "My scenario title",
                "mode"      : "ADVANCED",// 'ADVANCED' or 'SIMPLE'
                "language"  : "JS",// 'JS'
                "status"    : "ACTIVE",//'ACTIVE' or 'INACTIVE'
                "createdAt" : "createdAt",
                "updatedAt" : "updatedAt"
            }//,...
        ],
        limit  : 50,
        offset : 1 ,
        total  : 10
    }

```