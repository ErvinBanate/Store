const sqlite = require('sqlite3');
const path = require('path');
const database = new sqlite.Database(path.resolve(__dirname, 'Database/Store.db'), (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});


database.get('SELECT * FROM Users WHERE username = "Admin" AND password = "Admin"', (err, row) => {
    if (err) {
        throw err;
    }
    console.log(row.username + " " + row.password);
});