create table product (
    id UUID primary key,
    name VARCHAR(255) not null,
    description TEXT,
    image_url VARCHAR(255),
    price DOUBLE precision
);

create table category (
	id SERIAL primary key,
	name VARCHAR(255) not null,
	creation_date TIMESTAMP without TIME zone
);

create table product_category (
	product_id UUID not null,
	category_id SERIAL not null,
	primary key (product_id, category_id),
	foreign key (product_id) references product (id) on delete cascade,
	foreign key (category_id) references category (id) on delete cascade
);

create table address (
	id SERIAL primary key,
	street VARCHAR(255) not null,
	city VARCHAR(255) not null,
	state VARCHAR(2) not null,
	zip_code VARCHAR(10) not null
);

create table person (
	id BIGSERIAL primary key,
	cpf VARCHAR(11) not null,
	name VARCHAR(100) not null,
	birth DATE not null,
	email VARCHAR(255) not null
);

alter table address
	add column person_id bigint not null;

alter table address
	add constraint fk_address_person
	foreign key (person_id)
	references person(id);

create table "user" (
	id SERIAL primary key,
	username varchar(255) not null,
	password varchar(255) not null
);

alter table person
	add column user_id int unique,
	add constraint fk_user_id foreign key (user_id) references "user"(id);