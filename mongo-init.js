db.createUser(
    {
        user: "maria",
        pwd: "fh348a",
        roles: [
            {
                role: "readWrite",
                db: "event-tracker"
            }
        ]
    }
);