const settings = require("./settings"); // settings.json
var args = process.argv.slice(2);
var knex = require('knex')({
    client: 'pg',
    connection: {
        user: settings.user,
        password: settings.password,
        database: settings.database,
        host: settings.hostname,
        port: settings.port,
        ssl: settings.ssl
    }
});

var data = {
    first_name: args[0],
    last_name: args[1],
    birthdate: args[2]
};
knex('famous_people')
    .insert(data)
    .asCallback((err, results) => {
        if (err) {
            console.log("Error from insert", err);
        }

        knex.select('*').from('famous_people').asCallback((error, rows) => {
            if (error) {
                console.log('Error from select', error);
            }
            // console.log('data:', data);
            console.log('rows:', rows);

            knex.destroy();
        });
    }
});