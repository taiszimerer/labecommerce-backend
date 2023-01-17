-- Active: 1673874119312@@127.0.0.1@3306
-- Criar tabela
CREATE TABLE users (
    id INTEGER PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users (
    id,
    email, 
    password
)
VALUES 
    (1, "taiszimerer@gmail.com", "123senha"),
    (2, "chaves@labenu.com", "oilabenu"),
    (3, "kiko@labenu.com", "bolaquadrada");

-- Buscar todos os users
SELECT * FROM users;


--products
CREATE TABLE products (
    id INTEGER PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL, 
    category TEXT NOT NULL
);

INSERT INTO products (
    id,
    name, 
    price, 
    category
)
VALUES 
    (1, "caderno", 14, "Acessórios"),
    (2, "salto", 55, "Roupas e calçados"),
    (3, "som", 300, "Eletrônicos"),
    (4, "maquiagem", 81, "Acessorios"),
    (5, "ipad", 2000, "Eletrônicos");
    




