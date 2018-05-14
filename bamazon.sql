CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30),
    customer_price INTEGER(10) NOT NULL,
    stock_quantity INTEGER(30) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, customer_price, stock_quantity)
VALUES ("Portal Gun", "Travel", 1000, 10);

INSERT INTO products(product_name, department_name, customer_price, stock_quantity)
VALUES ("Mind Blowers Memory Vials", "Self Help", 500, 100);

INSERT INTO products(product_name, department_name, customer_price, stock_quantity)
VALUES ("Purified Fleeb", "Misc", 100, 50);

INSERT INTO products(product_name, department_name, customer_price, stock_quantity)
VALUES ("Time Crystal", "Self Help", 10000, 5);

INSERT INTO products(product_name, department_name, customer_price, stock_quantity)
VALUES ("Butter Robot", "Electronics", 50, 100);

INSERT INTO products(product_name, department_name, customer_price, stock_quantity)
VALUES ("Neutrino Bomb", "Leisure", 1000000, 5);

INSERT INTO products(product_name, department_name, customer_price, stock_quantity)
VALUES ("IQ Enhancing Helmet", "Education", 100, 200);

INSERT INTO products(product_name, department_name, customer_price, stock_quantity)
VALUES ("Interdimensional Cable Box", "Entertainment", 100, 100);

INSERT INTO products(product_name, department_name, customer_price, stock_quantity)
VALUES ("Gwendolyn Doll", "Self Help",100, 10000);

INSERT INTO products(product_name, department_name, customer_price, stock_quantity)
VALUES ("Mr. Meeseeks Box", "Self Help", 100, 60);