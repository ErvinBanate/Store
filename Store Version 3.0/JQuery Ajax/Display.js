$(document).ready(() => {
    $(window).on("load", () => {
        $.ajax({
            url: 'http://Localhost:8080/Display',
            method: 'GET',
            dataType: 'html'
        }).done((data) => {
            if (data == undefined) {
                alert('ERROR!!!!!');
                return;
            }
            // console.log(data);
            $('#Products').append(data);
        });
        $.ajax({
            url: 'http://Localhost:8080/Choices',
            method: 'GET',
            dataType: 'html'
        }).done((data) => {
            if (data == undefined) {
                alert('ERROR!!!!');
                return;
            }
            $('#list').append(data);
        });
    });
});
