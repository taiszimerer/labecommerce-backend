-- Active: 1673874119312@@127.0.0.1@3306

-- Users
CREATE TABLE
    users (
        id INTEGER PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

INSERT INTO
    users (id, name, email, password)
VALUES (
        1,
        "tais",
        "taiszimerer@gmail.com",
        "123senha"
    ), (
        2,
        "chaves", 
        "chaves@labenu.com",
        "oilabenu"
    ), (
        3,
        "kiko",
        "kiko@labenu.com",
        "bolaquadrada"
    );

-- Buscar todos os users
SELECT * FROM users;

INSERT INTO
    users (id, name, email, password)
VALUES (
        4,
        "barbie",
        "barbie@gmail.com",
        "123girl"
    );

    DROP TABLE users;






--products
CREATE TABLE
    products (
        id INTEGER PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL, 
        imageUrl TEXT UNIQUE NOT NULL
    );

INSERT INTO
    products (id, name, price, category, imageUrl)
VALUES 
    (1, "caderno", 14, "Acessórios", "httpsf.."), 
    (2, "salto", 55, "Roupas e calçados", "https.a."), 
    (3, "som", 300, "Eletrônicos", "httpss.."), 
    (4,"maquiagem", 81,"Acessorios", "https.d."),
    (5, "ipad", 2000, "Eletrônicos", "https.s.");

SELECT * FROM products;

DROP TABLE products;

SELECT * FROM products WHERE name LIKE '%ipad';

INSERT INTO
    products (id, name, price, category, imageUrl)
VALUES (6, "monitor", 56, "Eletrônicos", "https.."),
        (7, "iphone", 556, "Eletrônicos", "https..ax");

SELECT * FROM users WHERE id LIKE '1';

DELETE FROM users WHERE id LIKE '4' ;

DELETE FROM products WHERE id LIKE '4' ;

-- Editando valor de id 1 para id 4
UPDATE users SET id = 4 WHERE id LIKE '1';

UPDATE products SET name = 'iphone' WHERE name LIKE 'ipad';

--retorna o resultado ordenado pela coluna email em ordem crescente
SELECT * FROM users ORDER BY email ASC;

SELECT * FROM products ORDER BY price ASC;

SELECT * FROM products LIMIT 20;



--purchases
CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        total_price REAL NOT NULL,
        paid INTEGER NOT NULL,
        delivered_at TEXT,
        buyer_id TEXT NOT NULL,
        FOREIGN KEY (buyer_id) REFERENCES users (id) --referencia tabela users
    );

INSERT INTO
    purchases (id, total_price, paid, buyer_id)
VALUES ("pu001", 256, 0, "2"), ("pu002", 500, 1, "2"), ("pu003", 193, 0, "3"), ("pu004", 89, 0, "3"), ("pu005", 952, 1, "4"), ("pu006", 378, 1, "4");

DROP TABLE purchases;

SELECT * FROM purchases;

UPDATE purchases
SET
    delivered_at = DATETIME('now')
WHERE id = "pu001";

SELECT *
FROM purchases
    INNER JOIN users ON purchases.buyer_id = users.id;

SELECT *
FROM purchases
    INNER JOIN users ON purchases.buyer_id = users.id
WHERE users.id = 2;



--purchase/product - relacionais
CREATE TABLE
    purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases (id),
        FOREIGN KEY (product_id) REFERENCES products (id)
    );

INSERT INTO
    purchases_products (
        purchase_id,
        product_id,
        quantity
    )
VALUES ("pu001", 1, 15);

SELECT * FROM purchases_products;

DROP TABLE purchases_products;

SELECT
    purchases.id AS purchasesId,
    products.id AS productsId,
    products.name,
    purchases_products.quantity,
    purchases.total_price
FROM purchases_products
    INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
    INNER JOIN products ON purchases_products.product_id = products.id;