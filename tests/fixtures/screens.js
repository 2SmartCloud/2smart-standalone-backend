module.exports = [
    {
        id       : 1,
        name     : 'My screen 1',
        position : 1,
        layout   : {
            lg : [
                {
                    h      : 1,
                    i      : '1',
                    w      : 1,
                    x      : 4,
                    y      : 0,
                    minH   : 1,
                    minW   : 1,
                    moved  : false,
                    static : false
                }
            ],
            md : [
                {
                    h    : 1,
                    i    : '1',
                    w    : 1,
                    x    : 0,
                    y    : 0,
                    minH : 1,
                    minW : 1
                }
            ],
            sm : [
                {
                    h    : 1,
                    i    : '1',
                    w    : 1,
                    x    : 0,
                    y    : 0,
                    minH : 1,
                    minW : 1
                }
            ]
        },
        parentControl : false
    },
    {
        id            : 2,
        name          : 'My screen 2',
        position      : 2,
        layout        : {},
        parentControl : true
    }
];
