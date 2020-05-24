const account = [
    {
        username: "Cashier",
        password: "productchecker"
    },
    {
        username: "Admin",
        password: "Admin"
    }
]

function valid() {
    var Iuser = document.getElementById("username").value;
    var Ipass = document.getElementById("password").value;

    for (let x=0; x<account.length; x++) {
        if (Iuser==account[0].username && Ipass==account[0].password) {
            console.log("You are Logged In!!!");
            window.location.href="/Cashier";
            return;
        }
        if (Iuser==account[1].username && Ipass==account[1].password) {
            console.log("Welcome Admin");
            window.location.href="/Admin";
            return;
        }
    }
    alert("Incorrect Username or Password!!");
}

function viewPassword() {
    var password = document.getElementById("password");

    if (password.type == "password") {
        password.type = "text";
    }
    else {
        password.type = "password";
    }
}
