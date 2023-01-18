-- Active: 1673874119312@@127.0.0.1@3306

-- Criar tabela

CREATE TABLE
    users (
        id INTEGER PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

INSERT INTO
    users (id, email, password)
VALUES (
        1,
        "taiszimerer@gmail.com",
        "123senha"
    ), (
        2,
        "chaves@labenu.com",
        "oilabenu"
    ), (
        3,
        "kiko@labenu.com",
        "bolaquadrada"
    );

-- Buscar todos os users

SELECT * FROM users;

--products

CREATE TABLE
    products (
        id INTEGER PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

INSERT INTO
    products (id, name, price, category)
VALUES (1, "caderno", 14, "Acessórios"), (
        2,
        "salto",
        55,
        "Roupas e calçados"
    ), (3, "som", 300, "Eletrônicos"), (
        4,
        "maquiagem",
        81,
        "Acessorios"
    ), (5, "ipad", 2000, "Eletrônicos");

    

SELECT * FROM products;

SELECT * FROM products WHERE name LIKE '%ipad';

INSERT INTO
    users (id, email, password)
VALUES (
        4,
        "barbie@gmail.com",
        "123girl"
    );

INSERT INTO
    products (id, name, price, category)
VALUES (6, "monitor", 56, "Eletrônicos");

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

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        total_price REAL UNIQUE NOT NULL,
        paid INTEGER NOT NULL,
        delivered_at TEXT,
        buyer_id TEXT NOT NULL,
        FOREIGN KEY (buyer_id) REFERENCES users (id) --referencia tabela users
    );

INSERT INTO purchases (id, total_price, paid, buyer_id)
VALUES
("pu001", 256, 0,  "2" ),
("pu002", 500, 1,  "2" ),
("pu003", 193, 0, "3" ),
("pu004", 89, 0, "3" ),
("pu005", 952, 1, "4" ),
("pu006", 378, 1,  "4" );

DROP TABLE purchases;

SELECT * FROM purchases;

UPDATE purchases
SET delivered_at = DATETIME('now')
WHERE id = "pu001";

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id;

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE users.id = 2