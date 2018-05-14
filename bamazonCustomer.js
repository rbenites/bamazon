/* jshint esversion: 6 */

/*Create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

6. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.
*/
/*=+=NPM Required===*/
var mysql = require("mysql");
var inquirer = require('inquirer');

/*===Global Variables===*/
var lineBreak = "\n-------------------------";
var productArr = [];

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Rocky115@",
  database: "bamazon_db",
});

//function to show error if connection is not establish else log the connection ID and call next function to start program
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  loadArray();
  whatToDo();
});

function whatToDo() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "See a List of Products",
        "Place an Order",
        "Quit"]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "See a List of Products":
          displayInventory();
          break;

        case "Place an Order":
          enterOrder();
          break;

        case "Quit":
          console.log("Thank you for shopping at Rick's House of Wonder. Stay Shwifty!");
          endConnection();
          break;
      }
    });
}

//function to display inventory
function displayInventory() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    res.forEach(element => {
      console.log("Item ID: " + element.item_id +
        " | Product Name: " + element.product_name +
        " | Price: $" + element.customer_price +
        " | Quantity on hand: " + element.stock_quantity
      );
    });
    console.log(lineBreak);
    whatToDo();
  });
}

function loadArray() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    res.forEach(element => {
      var newProduct = element.item_id + " | " + element.product_name + " | $" + element.customer_price;
      productArr.push(newProduct);
      });
    });
  }

function enterOrder() {
      connection.query("SELECT * FROM products", function (err, res) {
        inquirer
          .prompt([
            {
              type: "list",
              name: "inventoryList",
              message: "What would you like to order?",
              choices: productArr,
              pageSize: productArr.length
            },
            {
              type: "text",
              name: "quantity",
              message: "How many would you like to order?",
            }
          ])
          .then(function (product) {
            var productID = product.inventoryList.split(" | ")[0];
            var productName = product.inventoryList.split(" | ")[1];
            var productQuantity = product.quantity;
            if (productQuantity > res[productID - 1].stock_quantity) {
              console.log("\nLooks like you want more " + productName + "s than what we have.\n");
            } else {
              console.log("\nYour order of " + productQuantity + " " + productName + "(s) has been placed!");
              console.log("Order Total: $" + (productQuantity * res[productID - 1].customer_price) + "\n");
              console.log("Thank you for getting shwifty with it!");
              connection.query("UPDATE products SET ? WHERE?",
                [
                  {
                    stock_quantity: (res[productID - 1].stock_quantity - productQuantity)
                  },
                  {
                    item_id: productID
                  }
                ]
              );
            }
            whatToDo();
          });
      });
    }

//function to end connection
function endConnection() {
      connection.end();
    }