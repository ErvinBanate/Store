function onclickCashierDisplay(data) {
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
                <td><button onclick="remove(this.id)" id=${loop} class="delete">Delete</button></td>
            </tr>`;
        }
        document.getElementById("Orders").innerHTML = tableBody;
    }
}

function inputReset() {
    document.getElementById("CInpKey").value = "";
    document.getElementById("CInpVal").value = "";
}

function orderChecking(key, quantity) {
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
    return 0;
}

function order(stockData, orderData) {
    var orderName = document.getElementById("CInpKey").value;
    var orderQuanity = document.getElementById("CInpVal").value;
    var VP;

    const check = orderChecking(orderName, orderQuanity);
    if (check == 1) {
        return;
    }

    //console.log(key);
    //console.log(Value);
    for (let c=0; c<stockData.length; c++) {
        if (orderName==stockData.key(c)) {
            var price = JSON.parse(stockData.getItem(orderName));
            for (let b=0; b<orderData.length; b++) {
                //console.log(b);
                if (orderName==orderData.key(b)) {
                    console.log("Replace!");
                    
                    var svalue = JSON.parse(orderData.getItem(orderName));
                    var nvalue = parseInt(svalue[0], 10);
                    var NValue = parseInt(orderQuanity, 10);
                    var Nprice = parseInt(price[1], 10);

                    //console.log(typeof nvalue);
                    //console.log(nvalue);
                    //console.log(typeof NValue);
                   
                    NValue += nvalue;
                    Nprice *= NValue;
                    VP = [NValue, Nprice];
                    
                    //console.log(NValue);
                    orderData.setItem(orderName, JSON.stringify(VP));
                    inputReset();
                    return;
                }
            }
            //console.log("New!");
            var NValue = parseInt(orderQuanity, 10);
            var Nprice = parseInt(price[1], 10);
            Nprice *= NValue;
            VP = [NValue, Nprice];
            orderData.setItem(orderName, JSON.stringify(VP));
            inputReset();
            return;
        }
    }
}

function checkStock(stockData) {
    const orderName = document.getElementById("CInpKey").value;
    const orderQuanity = document.getElementById("CInpVal").value;

    // console.log(orderName);
    // console.log(orderQuanity);

    for (let loop=0; loop < stockData.length; loop++) {
        // console.log(loop);
        if (orderName == stockData.key(loop)) {
            // console.log(stockData.key(loop));
            const stockQuantity = JSON.parse(stockData.getItem(orderName));
            // console.log(stockQuantity[0])
            if (orderQuanity < stockQuantity[0]) {
                // console.log("Ordering..")
                order(localStorage, sessionStorage);
                // console.log("Finishing..")
                return;
            }
            else {
                alert("The Stock of " + orderName + " is only " + stockQuantity[0]);
            }
        }

    }
}

function checkProduct(stockData) {
    var orderName = document.getElementById("CInpKey").value;
    // console.log(orderName);

    for (let loop=0; loop < stockData.length; loop++) {
        if (orderName == stockData.key(loop)) {
            //console.log("Checking...")
            checkStock(localStorage);
            return;
        }
    }
    alert(orderName + " is not found in the Storage. Please recheck the spelling of the product that you order");
}

function onclickTotalPrice(orderData) {
    let totalPrice=0;
    for (let d=0; d<orderData.length; d++) {
        const key = orderData.key(d);
        const price = JSON.parse(orderData.getItem(key));

        totalPrice += price[1];
    }
    document.getElementById("Total").innerHTML = "Total Price: " + "\u20B1" + " " + totalPrice;
    return totalPrice;
}

function remove(id) {
    let el = document.getElementById(id);
    let parent = el.closest("tr");
    // console.log(parent);
    let orderName = parent.firstElementChild.innerHTML;
    // console.log(orderName);

    for (let loop=0; loop < sessionStorage.length; loop++) {
        if (orderName == sessionStorage.key(loop)) {

            sessionStorage.removeItem(orderName);
        }
    }
    onclickTotalPrice(sessionStorage);
    onclickCashierDisplay(sessionStorage);
}


function finish(stockData, orderData) {
    for (let e=0; e<orderData.length; e++) {
        const rkey = orderData.key(e);
        //console.log(rkey);
        const rval = JSON.parse(orderData.getItem(rkey));
        //console.log(rval);
        var nrval = parseInt(rval[0], 10);
        //console.log(nrval);
        //console.log(typeof nrval);
        var NVP;

        for (let f=0; f<stockData.length; f++) {
            const key = stockData.key(f);
            //console.log(key);
            const value = JSON.parse(stockData.getItem(key));
            //console.log(value);
            if (rkey == key) {
                var nvalue = parseInt(value[0], 10);
                //console.log(typeof nvalue);
                //console.log(nvalue);
                nvalue -= nrval;
                //console.log(nvalue);
                NVP = [nvalue,value[1]];
                //onsole.log(NVP);
                stockData.setItem(key, JSON.stringify(NVP));
            }
        }
    }
}

function placeOrder() {
    checkProduct(localStorage);
    onclickCashierDisplay(sessionStorage);
    onclickCashierDisplay(localStorage);
    onclickTotalPrice(sessionStorage);
}

function resetButton() {
    finish(localStorage, sessionStorage);
    sessionStorage.clear();
    onclickTotalPrice(sessionStorage);
    onclickCashierDisplay(sessionStorage);
    onclickCashierDisplay(localStorage);
}