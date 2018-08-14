const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
module.exports = router;

// sets up the database connection
function getConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'fullaccess',
    password: 'fullaccess',
    database: 'bamazon',
    multipleStatements: true
  });
}

// gets the connection
getConnection().connect((error) => {
  if (error) {
    console.log('DB Connection Failed: ' + JSON.stringify(error, undefined, 2));
  } else {
    console.log("Connected to database");
  }
});

// get all products
router.get('/products', (request, response) => {
  getConnection().query('SELECT * FROM products', (error, rows, results) => {

    if (error) {
      console.log("get all products: " + error);
      response.sendStatus(500);
      return;
    }

    console.log("get all products");
    console.log(rows); // send results to console
    response.send(rows); // send results to browser
    //    response.json(rows);
  })
});

// query database
router.post('/order_form', (request, response) => {
  console.log("Order Form");

  console.log("item_id:" + request.body.item_id);
  console.log("stock quantity:" + request.body.stock_quantity);

  const itemId = request.body.item_id;
  const stockQuantity = request.body.stock_quantity;

  const selectQuery = "SELECT * FROM products WHERE item_id = ?";
  getConnection().query(selectQuery, [itemId], (error, rows, results) => {

    if (error) {
      console.log(error);
      response.sendStatus(500);
      return;
    }

    var price = rows[0].price;
    var stock_quantity_result = rows[0].stock_quantity;
    var new_quantity = stock_quantity_result - stockQuantity;

    if (stock_quantity_result < stockQuantity) {
      console.log("Insufficient quantity! - order requested: " + stockQuantity + ' number in stock: ' + stock_quantity_result);
    } else {
      console.log("In stock - order requested: " + stockQuantity + ' number in stock: ' + stock_quantity_result);
      console.log("Total Cost: " + stockQuantity * price);

      const updateQuery = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
      getConnection().query(updateQuery, [new_quantity, itemId], (error, rows, results) => {

        if (error) {
          console.log(error);
          response.sendStatus(500);
          return;
        }

        console.log(rows); // send results to console
        response.send(rows); // send results to browser
      })
      //response.end();
    }
  })
});
