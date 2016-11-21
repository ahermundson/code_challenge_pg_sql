-- Database name
CREATE DATABASE treats
-- Document your create tables SQL here
CREATE TABLE treats(
id SERIAL PRIMARY KEY,
name VARCHAR(80) NOT NULL,
description VARCHAR(200) NOT NULL,
pic VARCHAR(100) NOT NULL);


INSERT INTO treats (name, description, pic)
VALUES ('Cupcake', 'A delicious cupcake', '/assets/cupcake.jpg'),
('Donuts', 'Mmmm donuts', '/assets/donuts.jpg');
