## This is a simple project developed during Rocketseat Next Level Week

for instalation you`ll need make the clone and run the command 

> npm install

to install all project dependencies.

the project need access a database, and this access is monitored by TypeOrm.
to make the access, you need configure the connection on file _ormconfig.json_ and _src/database/index.ts_

the information that you need is: 

```
{
    "type": "YOUR_DATABASE",
    "host": "YOUR_HOST",
    "port": "YOUR_PORT",
    "username": "YOUR_USERNAME",
    "password": "YOUR_DATABASE_PASSWORD",
    "database": "YOUR_DATABASE_NAME",
    "synchronize": true,
    "logging": false,
    "migrations": ["./src/database/migrations/*.ts"],
    "entities": ["/src/models/*.ts"],
    "cli": {
        "migrationsDir": "./src/database/migrations",
        "entitiesDir": "./src/models"
    }
}
,,,

after that you can run the command
> npm start

to run the project


### Enjoy
