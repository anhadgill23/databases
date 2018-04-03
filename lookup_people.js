var args = process.argv[2];
const pg = require("pg");
const settings = require("./settings"); // settings.json
var moment = require('moment');
var count = 0;

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
    client.query('SELECT * FROM famous_people WHERE $1 = first_name', [args], (err, res) => {
        if (err) {
            throw err;
        } else {
            console.log('Searching ...');
            console.log(`Found ${res.rows.length} person(s) by the name '${args}'`);
            res.rows.forEach(function (item, index) {
                count++;
                console.log(`- ${count}: ${item.first_name} ${item.last_name}, born ${moment(item.birthdate).format("YY-DD-MM")}`);
            })
        }
        client.end();
    })
});

