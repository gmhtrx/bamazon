var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "root",
    password: "root",
    database: "bamazon"
})

var makeTable = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        console.log("Item ID\tProduct Name\tDepartment Name\tPrice\tNumber in stock")
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        for(var i=0; i <res.length; i++) {
            console.log(res[i].itemid + " \t " + res[i].productname + " \t " + res[i].departmentname + " \t " + res[i].price + " \t " + res[i].stockquantity + "\n");
        }
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    })
}
makeTable();
