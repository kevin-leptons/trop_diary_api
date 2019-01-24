db.createUser(
    {
        user: "root",
        pwd: "root",
        roles:[
            {
                role: "readWrite",
                db:   "trop_diary_api"
            }
        ]
    }
);
