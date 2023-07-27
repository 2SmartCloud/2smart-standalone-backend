# UPDATE SCREEN
-------------

## Request

    PUT /api/v1/screens/:id

```JSON5

    {
        "data": {
            "name"      : "my_scebnario_1",
            "title"     : "My scenario title",  
            "mode"      : "ADVANCED",// 'ADVANCED' or 'SIMPLE', defaultValue: 'ADVANCED'
            "script"    : "echo 'hello';",
            "language"  : "JS",// 'JS', defaultValue: 'JS'
            "status"    : "ACTIVE",//'ACTIVE' or 'INACTIVE', defaultValue: 'INACTIVE'
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
            "script"    : "echo 'hello';",
            "status"    : "ACTIVE",//'ACTIVE' or 'INACTIVE'
            "createdAt" : "createdAt",
            "updatedAt" : "updatedAt"
        }
    }

```