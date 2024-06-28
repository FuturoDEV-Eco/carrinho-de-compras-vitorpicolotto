-- Exercicio 2 - criação da tabela de cliente
create table clients (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(150) not null,
	email VARCHAR(150) unique not null,
	cpf varchar(50) unique not null,
	contact varchar(20) not null
)
