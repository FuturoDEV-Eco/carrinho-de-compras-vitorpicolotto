-- TODOS OS CÓDIGOS FORAM APLICADOS NO PGADMIN

-- Exercicio 2 - criação da tabela de cliente
create table clients (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(150) not null,
	email VARCHAR(150) unique not null,
	cpf varchar(50) unique not null,
	contact varchar(20) not null
)


-- Exercicio 3 - criação de tabela de categorias
create table categories (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(150) not null
)

insert INTO categories (nome)
VALUES ('Celulares'),('Pets'), ('Cozinha'), ('Escritório'), ('Games'), ('Banheiro'), ('Roupas'), ('Bugigangas'), ('Brinquedos')

        -- criando a tabela de produtos
create table products (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(150) not null,
	amount INTEGER unique default 0,
	color VARCHAR(50),
	voltage NUMERIC(3, 0),
	description TEXT,
	category_id INTEGER not null,
	FOREIGN KEY (category_id) REFERENCES categories (id)
)

--Exercicio 6

create table orders (
	id SERIAL PRIMARY KEY,
	client_id INT not null,
	total decimal(10,2) not null,
	address text not null,
	observations text,
	FOREIGN KEY (client_id) references clients (id)
)

create table orders_items(
	id SERIAL PRIMARY KEY,
	order_id INT not null,
	product_id INT not null,
	amount int not null,
	price decimal (10, 2) not null,
	FOREIGN KEY (order_id) references orders (id),
	FOREIGN KEY (product_id) references products (id)
)