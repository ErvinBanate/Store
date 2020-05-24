function productChoices(stockData) {
    var option = '';

    for (let loop=0; loop<stockData.length; loop++) {
        const key = stockData.key(loop);

        option += '<option value ="'+key+'" />';
    }
    document.getElementById("Product").innerHTML = option;
}

function checking(key, quantity, price, type) {
    if (type == 1) {
        if (quantity == "" || key == "") {
            if (quantity == "") {
                quantity = "NO VALUE";
            }      
            if (key == "") {
                key = "NO VALUE";
            }
            alert("The Value of Product Name is " + key + " and The Value of Quantity is " + quantity);
            return 1;
        }  
    }
    else if (type == 2) {
        if (quantity == "" || key == "" || price == "") {
            if (quantity == "") {
                quantity = "NO VALUE";
            }
            if (key == "") {
                key = "NO VALUE";
            }
            if (price == "") {
                price = "NO VALUE";
            }
            alert("The Value of Product Name is " + key + ", The Value of Quantity is " + quantity + " and The Value of Price is " + price);
            return 1;
        }
    }
    else if (type == 3) {
        if (key == "" || price == "") {
            if (key == "") {
                key = "NO VALUE";
            }
            if (price == "") {
                price = "NO VALUE";
            }
            alert("The Value of Product Name is " + key + " and The Value of Price is " + price);
            return 1;
        }
    }
    return 0;
}

function addStock(stockData) {
    const type = 1;
    const key = document.getElementById("addKey").value;
    let quantity = document.getElementById("addQuantity").value;
    let QP;

    const check = checking(key, quantity, 0, type);

    if (check == 1) {
        document.getElementById("addKey").value = "";
        document.getElementById("addQuantity").value = "";
        return;
        
    }    

    for (let loop=0; loop < stockData.length; loop++) {
        if (key == stockData.key(loop)) {
            let stringQuantity = JSON.parse(stockData.getItem(key));
            let numberQuantity = parseInt(stringQuantity[0], 10);
            let numberquantity = parseInt(quantity, 10);

            numberquantity += numberQuantity;
            QP = [numberquantity,stringQuantity[1]];
            stockData.setItem(key, JSON.stringify(QP));
            document.getElementById("addKey").value = "";
            document.getElementById("addQuantity").value = "";
            display(stockData);
            return;
        }
    }
    alert(key + " is not found in the storage");
    document.getElementById("addKey").value = "";
    document.getElementById("addQuantity").value = "";
}

function insertData(stockData) {
    const type = 2;
    const key = document.getElementById("newKey").value;
    const quantity = document.getElementById("newQuantity").value;
    const price = document.getElementById("newPrice").value;
    let QP;

    const check = checking(key, quantity, price, type);

    if (check == 1) {
        document.getElementById("newKey").value = "";
        document.getElementById("newQuantity").value = "";
        document.getElementById("newPrice").value = "";
        return;
    } 
    
    for (let b=0; b<stockData.length; b++) {
        if (key==stockData.key(b)) {
            alert(key + " is present in the stock, it is not a new product");
            document.getElementById("newKey").value = "";
            document.getElementById("newQuantity").value = "";
            document.getElementById("newPrice").value = "";
            return;
        }
    }
    QP = [quantity,price];
    stockData.setItem(key,JSON.stringify(QP));
    document.getElementById("newKey").value = "";
    document.getElementById("newQuantity").value = "";
    document.getElementById("newPrice").value = "";
    display(stockData);
}

function newPrice(stockData) {
    const type = 3;
    const key = document.getElementById("changeKey").value;
    const price = document.getElementById("changePrice").value;
    let QP;

    const check = checking(key, 0, price, type);

    if (check == 1) {
        const key = document.getElementById("changeKey").value = "";
        const price = document.getElementById("changePrice").value = "";
        return;    
    }

    for (let loop=0; loop < stockData.length; loop++) {
        if (key == stockData.key(loop)) {
            const stringPrice = JSON.parse(stockData.getItem(key));

            QP = [stringPrice[0], price];
            stockData.setItem(key, JSON.stringify(QP));
            document.getElementById("changeKey").value = "";
            document.getElementById("changePrice").value = "";
            display(stockData);
            return;
        }
    }
    alert(key + " is not found in the storage");
    document.getElementById("changeKey").value = "";
    document.getElementById("changePrice").value = "";
}

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
        // console.log(tableBody);
    }
    document.getElementById("Products").innerHTML = tableBody;
    productChoices(stockData);
}