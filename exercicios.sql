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

