const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3');
const database = new sqlite.Database(path.resolve(__dirname, 'Database/Store.db'));
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// Front-end Designs and Functions
app.use(express.static('JS'));
app.use(express.static('CSS'));
app.use(express.static('JQuery Ajax'));

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

app.get('/Display', (req, res) => {
    let stocks = '';
    // let loop = 0;
    database.all('SELECT * FROM Stock', (err, result) => {
        // console.log(result);
        result.forEach((row) => {
            // console.log(row.product_name);
            // console.log(loop += 1);
            stocks += `<tr> 
                <td>${row.product_name}</td>
                <td>${row.quantity}</td>
                <td><b>\u20B1 ${row.price}</b></td>
            </tr>`;
        });
        // console.log('Data:' + stocks);
        res.send(stocks);
    });
    // res.send('DONE');
});

app.get('/Choices', (req, res) => {
    let list = '';

    database.all('SELECT * FROM Stock', (err, result) => {
        result.forEach((row) => {
            list += `<option value = "${row.product_name}"/>`;
        });
        res.send(list);
    });
});

app.get('/Cashier', (req, res) => {
    res.sendFile('Cashier.html', {root: path.join(__dirname + '/HTML')});
});

app.post('/login', (req, res) => {
    const username = req.body.user;
    const password = req.body.pass;
    // console.log(req.body);
    database.get('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password], (err, result) => {
        // console.log(result);
        if (err) {
            throw err;
        }
        else if (result == undefined) {
            // console.log("Wrong!!");
            res.send('Incorrect');
            return;
        }
        else if (result.user_type == 'Admin') {
            res.send('Admin');
            return;
        }
        else if (result.user_type == 'Cashier') {
            res.end('Cashier');
            return;
        }       
    });
});

app.post('/Admin/Add-Product/Add-Stock', (req, res) => {
    const name = req.body.key;
    let quantity = req.body.quantity;
    database.serialize(() => {
        database.get('SELECT * FROM Stock WHERE product_name = ?', [name], (err, result) => {
            if (err) {
                throw err;
            }
            else if (result == undefined) {
                // console.log('Incorrect!!!');
                res.send('Incorrect');
                return;
            }
            let stockQuantity = parseInt(result.quantity);
            let numberQuantity = parseInt(quantity);
            numberQuantity += stockQuantity;
            database.run('UPDATE Stock SET quantity = ? WHERE product_name = ?', [numberQuantity, name], (err) => {
                if (err) {
                    throw err;
                }
                res.send("Stock-Added");
                database.get('SELECT * FROM Products WHERE product_name = ?', [name], (err, row) => {
                    if (err) {
                        throw err;
                    }
                    database.run('UPDATE Products SET quantity = ? WHERE product_name = ?', [numberQuantity, name], (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                });
            });
        });
    });    
});

app.post('/Admin/Add-Product/New-Product', (req, res) => {
    const name = req.body.key;
    const quantity = req.body.quantity;
    const price = req.body.price;

    database.get('SELECT * FROM Stock WHERE product_name = ?', [name], (err, result) => {
        if (err) {
            throw err;
        }
        else if (result == undefined) {
            database.run('INSERT INTO Stock (product_name,quantity,price) VALUES(?,?,?)', [name, quantity, price], (err) => {
                if (err) {
                    throw err;
                }
                res.send('New');
                return;
            });
            database.get('SELECT * FROM Products WHERE product_name = ?', [name], (err, row) => {
                if (err) {
                    throw err;
                }
                else if (row == undefined) {
                    database.run('INSERT INTO Products (product_name,quantity) VALUES(?,?)', [name, quantity], (err) => {
                        if (err) {
                            throw err;
                        }
                        return;
                    });
                }
                let stockQuantity = parseInt(row.quantity);
                let numberQuantity = parseInt(quantity);
                numberQuantity += stockQuantity;
                database.run('UPDATE Products SET quantity = ? WHERE product_name = ?', [numberQuantity, name], (err) => {
                    if (err) {
                        throw err;
                    }
                    return;
                });
            });
        }
        res.send('Present');
    });
});

app.post('/Admin/Add-Product/Change-Price', (req, res) => {
    const name = req.body.key;
    const price = req.body.price;

    database.get('SELECT * FROM Stock WHERE product_name = ?', [name], (err, result) => {
        if (err) {
            throw err;
        }
        else if (result == undefined) {
            res.send('Incorrect');
            return;
        }
        database.run('UPDATE Stock SET price = ? WHERE product_name = ?', [price, name], (err) => {
            if (err) {
                throw err;
            }
            res.send('Price-Changed');
        });
    });
});

app.post('/Admin/Remove-Product/Remove-Stock', (req, res) => {
    const name = req.body.key;
    const quantity = req.body.quantity;

    database.get('SELECT * FROM Stock WHERE product_name = ?', [name], (err, result) => {
        if (err) {
            throw err;
        }
        else if (result == undefined) {
            // console.log('Incorrect!!!');
            res.send('Incorrect');
            return;
        }
        let stockQuantity = parseInt(result.quantity);
        let numberQuantity = parseInt(quantity);
        stockQuantity -= numberQuantity;
        database.run('UPDATE Stock SET quantity = ? WHERE product_name = ?', [stockQuantity, name], (err) => {
            res.send('Stock-Removed');
        });
    });
});

app.post('/Admin/Remove-Product/Remove', (req, res) => {
    const name = req.body.key;
    const quantity = req.body.quantity;

    database.get('SELECT * FROM Stock WHERE product_name = ?', [name], (err, result) => {
        if (err) {
            throw err;
        }
        else if (result = undefined) {
            res.send('Incorrect');
        }
        database.run('DELETE FROM Stock WHERE product_name = ?', [name], (err) => {
            if (err) {
                throw err;
            }
            res.send('Product-Removed');
        });
    });
});

app.get('/Cashier/Reset-Orders', (req, res) => {
    database.all('SELECT * FROM Orders', (err, result) => {
        if (err) {
            throw err;
        }
        // console.log(result);
        result.forEach((row) => {
            database.get('SELECT * FROM Stocks WHERE product_name = ?', [row.product_name], (err, product) => {
                let intQuantity = parseInt(product.quantity);
                let intOrder = parseInt(row.quantity);

                if (err) {
                    throw err;
                }
                else if ()
            });
            database.run('DELETE FROM Orders WHERE product_name = ?', [row.product_name], (err) => {
                if (err) {
                    throw err;
                }
            });
        });
        res.send('Reset-Success');
    });
});

app.get('/Cashier/Orders', (req, res) => {
    let orders = '';

    database.all('SELECT * FROM Orders', (err, result) => {
        if (err) {
            throw err;
        }
        result.forEach((row) => {
            orders += `<tr class=${row.ID}>
                <td class="name">${row.product_name}</td>
                <td>${row.quantity}</td>
                <td><b>\u20B1 ${row.price}</b></td>
                <td><button id=${row.ID} class="delete">DELETE</button></td>
            </tr>`
        });
        res.send(orders);
    });
});

app.post('/Cashier/Add-Order', (req, res) => {
    const name = req.body.key;
    const quantity = req.body.quantity;
    let stockPrice;
    let orderQuantity;
    let numberQuantity = parseInt(quantity);
    let orderPrice;

    database.get('SELECT * FROM Stock WHERE product_name = ?', [name], (err, result) => {
        if (err) {
            throw err;
        }
        else if (result == undefined) {
            res.send('Incorrect');
            return;
        }
        stockPrice = parseInt(result.price);
        database.get('SELECT * FROM Orders WHERE product_name = ?', [name], (err, row) => {
            // console.log(row);
            if (err) {
                throw err;
            }
            else if (row == undefined) {
                orderPrice = stockPrice * numberQuantity;
                database.run('INSERT INTO Orders (product_name, quantity, price) VALUES (?,?,?)', [name, quantity, orderPrice], (err) => {
                    if (err) {
                        throw err;
                    }
                    res.send('Order-Added');
                    return;
                });
            }
            else {
                orderQuantity = parseInt(row.quantity);
                orderQuantity += numberQuantity;
                orderPrice = orderQuantity * stockPrice;
                database.run('UPDATE Orders SET quantity = ? AND price = ? WHERE product_name = ?', [orderQuantity, orderPrice, name], (err) => {
                    if (err) {
                        throw err;
                    }
                    res.send('Order-Added');
                    return;
                });
            }
        });
    });
});

app.post('/Cashier/Delete', (req, res) => {
    const name = req.body.key;

    database.get('SELECT * FROM Orders WHERE product_name = ?', [name], (err, result) =>{
        if (err) {
            throw err;
        }
        else if (result == undefined) {
            res.send('Error')
            return;
        }
        else {
            database.run('DELETE FROM Orders WHERE product_name = ?', [name], (err) => {
                if (err) {
                    throw err;
                }
                res.send('Order-Deleted')
                return;
            });
        }
    });
});

app.listen(8080, () => console.log("You are Now Connected"));