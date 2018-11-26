var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "root",
    password: "root",
    database: "bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected");
    makeTable();
})

var makeTable = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        for(var i=0; i <res.length; i++) {
            console.log(res[i].itemid + " ||" + res[i].productname + " || " + res[i].departmentname + " || " + res[i].price + " || " + res[i].stockquantity + "\n")
        }
        promptCustomer(res);
    })
}

var promptCustomer = function(res) {
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "What would you like to purchase?"
    }]).then(function(answer){
        var correct = false;
        for(var i=0; i<res.length; i++) {
            if(res[i].productname == answer.choice) {
                correct = true;
                var product = answer.choice;
                var id = i;
                inquirer.prompt({
                    type: "input",
                    name: "quantity",
                    message: "How many would you like to purchase?",
                    validate: function(value) {
                        if(isNaN(value) == false){
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function(answer) {
                    if((res[id].stockquantity - answer.quantity) > 0) {
                        connection.query("UPDATE products SET stockquantity = '"+(res[id].stockquantity-answer.quantity)+"'WHERE productname='"+ product +"'", function(err, res2) {
                            console.log("Product purchased");
                            makeTable();
                        })
                    } else {
                        console.log("Not a valid selection");
                        promptCustomer(res);
                    }
                });
            }
        }
        if(i==res.length && correct==false) {
            console.log("not a valid selection");
            promptCustomer(res);
        }
    });
}