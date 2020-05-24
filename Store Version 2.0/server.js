const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3');
const database = new sqlite.Database(path.resolve(__dirname, 'Database/Store.db'));
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

// Front-end Designs and Functions
app.use(express.static('JS'));
app.use(express.static('CSS'));

app.get('/', (req, res) => {
    res.sendFile('Sign-In.html', {root: path.join(__dirname + '/HTML')});
});

app.get('/Admin', (req, res) => {
    res.sendFile('Admin.html', {root: path.join(__dirname + '/HTML')});
});

app.get('/Admin/Add-Product', (req, res) => {
    res.sendFile('Add-product.html', {root: path.join(__dirname + '/HTML')});
});

app.get('/Admin/Remove-Product', (req, res) => {
    res.sendFile('Remove-product.html', {root: path.join(__dirname + '/HTML')});
});

app.get('/Cashier', (req, res) => {
    res.sendFile('Cashier.html', {root: path.join(__dirname + '/HTML')});
});

app.post('/login', (req, res) => {
    const username = req.body.user;
    const password = req.body.pass;
    console.log(req.body);
    database.get('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
            throw err;
        }
        else if (row.username != username && row.password == password) {
            res.send('Error');
            return;
        }
        else if (row.username == username && row.password == password) {
            if (row.user_type == 'Admin') {
                // res.send(console.log(row.user_type));
                res.send('Admin');
                return;
            }
            else if (row.user_type == 'Cashier') {
                // res.send(console.log('Cashier'));
                res.end('Cashier');
                return;
            }       
        }
    });
});

app.listen(8080, () => console.log("You are Now Connected"));