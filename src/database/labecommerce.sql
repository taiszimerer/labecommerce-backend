-- Active: 1674651518919@@127.0.0.1@3306

-- Users
CREATE TABLE
    users (
        id INTEGER PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

INSERT INTO
    users (id, name, email, password)
VALUES (
       " 1",
        "tais",
        "taiszimerer@gmail.com",
        "123senha"
    ), (
        "2",
        "Lucas",
        "lucas@labenu.com",
        "oilabenu"
    ), (
        "3",
        "kiko",
        "kiko@labenu.com",
        "bolaquadrada"
    );

-- Buscar todos os users

SELECT * FROM users;

INSERT INTO
    users (id, name, email, password)
VALUES (
        "4",
        "barbie",
        "barbie@gmail.com",
        "123girl"
    );

DROP TABLE users;

SELECT * FROM users WHERE id LIKE '1';

DELETE FROM users WHERE id LIKE '4' ;

UPDATE users SET id = 4 WHERE id LIKE '1';



--products
CREATE TABLE
    products (
        id INTEGER PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT UNIQUE NOT NULL
    );

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        "1",
        "caderno",
        14,
        "Acessórios",
        "https://m.media-amazon.com/images/I/51LBWQZuuyL.__AC_SX300_SY300_QL70_ML2_.jpg"
    ), (
       " 2",
        "salto preto ponta fina",
        97,
        "Roupas e calçados",
        "https://static.zattini.com.br/produtos/scarpin-di-scarp-salto-alto-bico-fino-verniz-feminino/06/EPI-0041-006/EPI-0041-006_zoom1.jpg?ts=1564137443&ims=544x"
    ), (
        "3",
        "som bluetooth",
        299,
        "Eletrônicos",
        "https://imgs.casasbahia.com.br/55048203/1g.jpg?imwidth=64"
    ), (
        "4",
        "paleta de maquiagem",
        81,
        "Acessorios",
        "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:eco,w_80/v1/imagens/product/56222/5e78798b-35a6-4a57-821d-07fc00419689-mariana-saad-by-oceane-9-shades-paleta-de-sombras.png"
    ), (
        "5",
        "ipad 13 PRO",
        13000,
        "Eletrônicos",
        "https://m.media-amazon.com/images/I/61sEJ2+OAbL._AC_SX342_SY445_.jpg"
    );

SELECT * FROM products;

DROP TABLE products;

SELECT * FROM products WHERE name LIKE '%ipad';

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
       " 6",
        "monitor",
        56,
        "Eletrônicos",
        "https.."
    ), (
       " 7",
        "iphone",
        556,
        "Eletrônicos",
        "https..ax"
    );

DELETE FROM products WHERE id LIKE '4' ;


UPDATE products SET name = 'iphone' WHERE name LIKE 'ipad';


SELECT * FROM users ORDER BY email ASC;

SELECT * FROM products ORDER BY price ASC;

SELECT * FROM products LIMIT 20;


--purchases
CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,    
        total_price REAL NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        paid INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (buyer) REFERENCES users (id) --referencia tabela users
    );

INSERT INTO
    purchases (id, buyer, total_price, paid)
VALUES ("pu001", "2", 256, 0), ("pu002","2", 500, 1 ), ("pu003","3", 193, 0), ("pu004","3", 89, 0), ("pu005", "4", 952, 1), ("pu006", "4", 378, 1);

DROP TABLE purchases;

SELECT * FROM purchases;

SELECT *
FROM purchases
    INNER JOIN users ON purchases.buyer_id = users.id;

SELECT *
FROM purchases
    INNER JOIN users ON purchases.buyer_id = users.id
WHERE users.id = "2";


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
VALUES 
("pu001", "1", 15),
("pu002", "2", 1),
("pu003", "5", 9);

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