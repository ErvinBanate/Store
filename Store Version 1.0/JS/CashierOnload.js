function cashierDisplay(data) {
    var tableBody = '';
    if (data == localStorage) {
        for (let i=0; i <data.length; i++) {
            const key = data.key(i);        
            const value = JSON.parse(data.getItem(key));
            tableBody += `<tr> 
                <td>${key}</td>
                <td>${value[0]}</td>
                <td><b>\u20B1 ${value[1]}</b></td>
            </tr>`;
        }
        document.getElementById("storestock").innerHTML = tableBody;
    }
    if (data == sessionStorage) {
        for (let loop=0; loop <data.length; loop++) {
            const key = data.key(loop);        
            const value = JSON.parse(data.getItem(key));
            tableBody += `<tr> 
                <td>${key}</td>
                <td>${value[0]}</td>
                <td><b>\u20B1 ${value[1]}</b></td>
                <td><button onclick = "remove(this.id)" id=${loop}>Delete</button></td>
            </tr>`;
        }
        document.getElementById("Orders").innerHTML = tableBody;
    }
}

function totalPrice(orderData) {
    var totalPrice=0;
    for (let d=0; d<orderData.length; d++) {
        const key = orderData.key(d);
        const price = JSON.parse(orderData.getItem(key));

        totalPrice += price[1];
    }
    document.getElementById("Total").innerHTML = "Total Price: " + "\u20B1" + " " + totalPrice;
}

function productChoices(stockData) {
    var option = '';

    for (let loop=0; loop<stockData.length; loop++) {
        const key = stockData.key(loop);

        option += '<option value ="'+key+'" />';
    }
    document.getElementById("Product").innerHTML = option;
}

function display() {
    cashierDisplay(localStorage);
    cashierDisplay(sessionStorage);
    totalPrice(sessionStorage);
    productChoices(localStorage);
}