### /index/user

Request 

`GET /index/user.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {}
    }

### /index/index/login

Request 

`GET /index/index/login.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {}
    }

### /index/index/register

Request 

`GET /index/index/register.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {}
    }

### /index/account/info

Request 

`GET /index/account/info.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {}
    }

### /index/account/password

Request 

`GET /index/account/password.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {}
    }

### /index/market/plan

Request 

`GET /index/market/plan.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "entities": [
            {
                id: 1,
                status: 1,
                budget: 1000,
                name: "123",
                start_date: "2015-3-20",
                end_date: "2015-3-22",
                create_time: "2015-3-23",
                modified_time: "2015-3-24"
            },
            {
                id: 2,
                status: 0,
                budget: 2100,
                name: "1234",
                start_date: "2015-3-10",
                end_date: null,
                create_time: "2015-3-13",
                modified_time: "2015-3-14"
            }
        ]
    }

### /index/market/unit

Request 

`GET /index/market/unit.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "entities": [
            {
                id: 1,
                plan: 1,
                status: 1,
                adslot_type: 1,
                bid: 1000,
                charge_type: 1,
                ideas: [
    
                ],
                regions: [
    
                ],
                os_type: -1,
                name: "123",
                start_date: "2015-3-20",
                end_date: "2015-3-22",
                create_time: "2015-3-23",
                modified_time: "2015-3-24"
            },
            {
                id: 2,
                plan: 0,
                status: 0,
                adslot_type: 4,
                bid: 2100,
                charge_type: 0,
                ideas: [
                    89, 87
                ],
                os_type: 0,
                regions: [
                    1, 2
                ],
                name: "1234",
                start_date: "2015-3-10",
                end_date: "2015-3-12",
                create_time: "2015-3-13",
                modified_time: "2015-3-14"
            }
        ]
    }

### /index/market/idea

Request 

`GET /index/market/idea.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {}
    }

### /index/report/index

Request 

`GET /index/report/index.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {}
    }

