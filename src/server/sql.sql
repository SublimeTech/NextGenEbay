CREATE DATABASE nextgenebay;
CREATE USER nextgenebaydba WITH PASSWORD 'ebay';
GRANT ALL ON DATABASE nextgenebay TO nextgenebaydba;
CREATE TABLE "user"(id SERIAL PRIMARY KEY, username VARCHAR(255),
 password VARCHAR(255), created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW());
CREATE TABLE product(id SERIAL PRIMARY KEY, title VARCHAR(255),
 description TEXT, created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW());
 CREATE TABLE bid(id SERIAL PRIMARY KEY, amount MONEY,
    user_id INT NOT NULL references "user"(id),
    product_id INT NOT NULL references product(id), created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW());
