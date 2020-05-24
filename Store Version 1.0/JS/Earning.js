const fs = require('fs');

function saveEarn() {
    const totalprice = document.getElementById("Total").value;

    fs.writeFile("TotalEarnings.txt", totalprice, (err) => {
        if (err) throw err;

        console.log("Saved!!");
    });
}

function seeEarning() {
    fs.readFile('TotalEarnings.txt', 'utf8', (err, contents) => {
        if (err) throw err;

        console.log(contents);
    });
}