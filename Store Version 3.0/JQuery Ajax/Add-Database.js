$(document).ready(() => {
    $("#addStock").click(() => {
        const addKey = $('#addKey').val();
        const addQuantity = $('#addQuantity').val();
        $.ajax({
            url: 'http://Localhost:8080/Admin/Add-Product/Add-Stock',
            method: 'POST',
            data: {key: addKey, quantity: addQuantity},
            dataType: 'text'
        }).done((data) => {
            if (data == 'Incorrect') {
                alert("Product is NOT FOUND!!");
            }
            else if (data == 'Stock-Added') {
                alert("Stock is Updated!!");
            }
            else {
                alert("Error!!!!");
            }
        });
        $.ajax({
            url: 'http://Localhost:8080/Display',
            method: 'GET',
            dataType: 'html'
        }).done((data) => {
            if (data == undefined) {
                alert('Error!!!');
                return;
            }
            $('.AddProd input').val('');
            $('#Products').empty();
            $('#Products').append(data);
        });
    });
    $("#newProduct").click(() => {
        const newKey = $('#newKey').val();
        const newQuantity = $('#newQuantity').val();
        const newPrice = $('#newPrice').val();
        $.ajax({
            url: 'http://Localhost:8080/Admin/Add-Product/New-Product',
            method: 'POST',
            data: {key: newKey, quantity: newQuantity, price: newPrice},
            dataType: 'text'
        }).done((data) => {
            if (data == 'Present') {
                alert('Product is not NEW!! Product is Found at the Database');
            }
            else if (data == 'New') {
                console.log('Product Added!!');
            }
            else {
                alert('Error!!!!!');
            }
        });
        $.ajax({
            url: 'http://Localhost:8080/Display',
            method: 'GET',
            dataType: 'html'
        }).done((data) => {
            if (data == undefined) {
                alert('Error!!');
                return;
            }
            $('#Products').empty();
            $('#Products').append(data);
        });
        $.ajax({
            url: 'http://Localhost:8080/Admin/Choices',
            method: 'GET',
            dataType: 'html'
        }).done((data) => {
            if (data == undefined) {
                alert('ERROR!!!!');
                return;
            }
            $('.AddProd input').val('');
            $('#list').empty();
            $('#list').append(data);
        });
    });
    $("#priceChange").click(() => {
        const changeKey = $('#changeKey').val();
        const changePrice = $('#changePrice').val();
        $.ajax({
            url: 'http://Localhost:8080/Admin/Add-Product/Change-Price',
            method: 'POST',
            data: {key: changeKey, price: changePrice},
            dataType: 'text'
        }).done((data) => {
            if (data == 'Incorrect') {
                alert('Product is NOT FOUND!!!');
            }
            else if (data == 'Price-Changed') {
                alert("Product's Price has been changed!!");
            }
            else {
                alert("ERROR!!!!");
            }
        });
        $.ajax({
            url: 'http://Localhost:8080/Display',
            method: 'GET',
            dataType: 'html'
        }).done((data) => {
            if (data == undefined) {
                alert('Error!!!');
                return;
            }
            $('.AddProd input').val('');
            $('#Products').empty();
            $('#Products').append(data);
        });
    });
});