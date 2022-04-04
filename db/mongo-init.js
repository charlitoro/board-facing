db.createUser({
    user: 'facing',
    pwd: '@Fac1ng',
    roles: [
        {
            role: 'dbOwner',
            db: 'board-facing',
        },
    ],
});