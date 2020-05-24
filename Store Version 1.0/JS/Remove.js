function display(stockData) {
    var tableBody = "";
    for (let i=0; i <stockData.length; i++) {
        const key = stockData.key(i);        
        const value = JSON.parse(stockData.getItem(key));

        tableBody+= `<tr>
            <td>${key}</td>
            <td>${value[0]}</td>
            <td><b>\u20B1 ${value[1]}</b></td>
        </tr>`;
    }
    document.getElementById("Products").innerHTML = tableBody
}

function removeChecking(key, quantity, type) {
    if (type == 1) {
        if (quantity == "" || key == "") {
            if (quantity == "") {
                quantity = "NO VALUE";
            }      
            if (key == "") {
                key = "NO VALUE";
            }
            alert('The Value of Product Name is "' + key + '" and The Value of Quantity is "' + quantity + '"');
            return 1;
        }  
    }
    else if (type == 2) {
        if (key == "") {
            key = "NO VALUE";
            alert('The Value of Product Name is "' + key + '"');
            return 1;
        }
    }
    return 0;
}

function productChoices(stockData) {
    var option = '';

    for (let loop=0; loop<stockData.length; loop++) {
        const key = stockData.key(loop);

        option += '<option value ="'+key+'" />';
    }
    document.getElementById("Product").innerHTML = option;
}

function removeStock(stockData) {
    const type = 1;
    const key = document.getElementById("removeKey").value;
    let quantity = document.getElementById("removeQuantity").value;
    let QP;

    const check = removeChecking(key, quantity, type);
    if (check == 1) {
        document.getElementById("removeKey").value = "";
        document.getElementById("removeQuantity").value = "";
        return;
    }

    for (let loop=0; loop < stockData.length; loop++) {
        if (key == stockData.key(loop)) {
            const stockQuantity = JSON.parse(stockData.getItem(key));
            let numberStock = parseInt(stockQuantity[0], 10);
            let numberQuantity = parseInt(quantity, 10);

            numberStock -= numberQuantity;
            
            QP = [numberStock, stockQuantity[1]];
            stockData.setItem(key, JSON.stringify(QP));
            document.getElementById("removeKey").value = "";
            document.getElementById("removeQuantity").value = "";
            display(stockData);
            return;
        }
    }
    document.getElementById("removeKey").value = "";
    document.getElementById("removeQuantity").value = "";
    alert("The Product is not FOUND!!");
}

function removeData(stockData) {
    const type = 2;
    const key = document.getElementById("Rkey").value;

    const check = removeChecking(key, 0, type);
    if (check == 1) {
        document.getElementById("RKey").value = "";
        return;
    }

    for (let a=0; a<stockData.length; a++) {
        if (key==stockData.key(a)) {
            stockData.removeItem(key);
            document.getElementById("RKey").value = "";
            display(stockData);
            return;
        }
    }
    document.getElementById("RKey").value = "";
    alert("The Product cannot be found!!");
}

function onload() {
    display(localStorage);
    productChoices(localStorage);
}