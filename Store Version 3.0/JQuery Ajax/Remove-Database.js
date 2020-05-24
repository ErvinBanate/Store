$(document).ready(() => {
    $('#removeStock').click(() => {
        const removeKey = $('#removeKey').val();
        const removeQuantity = $('#removeQuantity').val();
        $.ajax({
            url: 'http://Localhost:8080/Admin/Remove-Product/Remove-Stock',
            method: 'POST',
            data: {key: removeKey, quantity: removeQuantity},
            dataType: 'text'
        }).done((data) => {
            if (data == 'Incorrect') {
                alert('Product is NOT FOUND!!!');
            }
            else if (data == 'Stock-Removed') {
                alert('Stock is now REMOVED!!!');
            }
            else {
                alert('ERROR!!!');
            }
        });
        $.ajax({
            url: 'http://Localhost:8080/Display',
            method: 'GET',
            dataType: 'html'
        }).done((data) => {
            if (data == undefined) {
                alert('ERROR!!!');
            }
            $('.RemProd input').val('');
            $('#Products').empty();
            $('#Products').append(data);
        });
    });
    $('#removeProduct').click(() => {
        const rKey = $('#rKey').val()
        $.ajax({
            url: 'http://Localhost:8080/Admin/Remove-Product/Remove',
            method: 'POST',
            data: {key: rKey},
            dataType: 'text'
        }).done((data) => {
            if (data == 'Incorrect') {
                alert('Product is NOT FOUND!!!');
            }
            else if (data == 'Product-Removed') {
                alert('Product has now been REMOVED!!!');
            }
            else {
                alert('ERROR!!!');
            }
        });
        $.ajax({
            url: 'http://Localhost:8080/Display',
            method: 'GET',
            dataType: 'html'
        }).done((data) => {
            if (data == undefined) {
                alert('ERROR!!!');
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
            $('.RemProd input').val('');
            $('#list').empty();
            $('#list').append(data);
        });
    });
});