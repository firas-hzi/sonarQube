create table Theme
(
theme_id int primary key, 
name varchar(50),
description varchar(50)
);
insert into Role values (1, 'admin',''),(2,'customer','');
insert into Theme values (1, 'light',''),(2,'dark','');
insert into Status values (1, 'ordered',''),(2,'shipped',''),(3, 'delivered', ''), (4, 'cancelled', '');
insert into Payment values (1, 'paypal',''),(2,'credit',''),(3, 'debit', ''), (4, 'check', '');
insert into Category values (1, 'sales',''),(2,'deals',''),(3, 'featured', ''), (4, 'default', '');
select * from Role;
select * from Theme;
select * from Status;
select * from Payment;
select * from Category;

create table Address
(
address_id int primary key generated always as identity,
street varchar(50),
city varchar (50),
state varchar(2),
zipcode int
);

CREATE TABLE Payment (
    payment_id int primary key ,
    name varchar(50),
    description varchar(50)
    
);

CREATE TABLE Status (
    status_id int primary key,
    name varchar(50) ,
    description varchar(100)
);
 
create table Role
(
role_id int primary key,
name varchar(50),
description varchar (50)
);

CREATE TABLE Category (
category_id int primary key,
name varchar(50) ,
description varchar(50)
);

CREATE TABLE Customer (
    customer_id int  primary key generated always as identity,
    name varchar(50),
    email varchar(50) not null,
    password varchar not null,
    phone_number varchar,
    image varchar(100), 
     theme_id int references Theme(theme_id) on delete cascade on update cascade,
     role_id int default 2 references Role(role_id) on delete cascade on update cascade
     );

     
     create table customer_address(
     customer_address_id int primary key generated always as identity,
     address_id int references Address(address_id) ON DELETE cascade on update cascade,
	 customer_id int references Customer(customer_id) on delete cascade on update cascade
     );




CREATE TABLE Product (
    product_id int  primary key generated always as identity,
    title varchar(100)   NOT NULL,
    price numeric(9,2),
    image varchar(100),
    quantity int   NOT NULL default 0,
    description varchar(200),
    modified_date timestamp,
    category_id int references Category(category_id) ON DELETE cascade on update cascade
);

create table Ticket(
ticket_id int primary key generated always as identity,
subject varchar(50),
created_by int references Customer(customer_id) ON DELETE cascade on update cascade
);



CREATE TABLE OrderDetail(
    order_id int  primary key generated always as identity,
    customer_id int references Customer(customer_id) ON DELETE cascade on update cascade,
    product_id int references Product(product_id) ON DELETE cascade on update cascade,
    created_date timestamp,
    total_price numeric(9,2) default 0,
    total_items int default 0,
    tax numeric(9,2),
    shipping_price numeric(9,2) default 0,
    status_id int references Status(status_id) ON DELETE cascade on update cascade,
    payment_id int references Payment(payment_id) ON DELETE cascade on update cascade
);




create table Messages(
message_id int primary key generated always as identity,
ticket_id int references Ticket(ticket_id) on delete cascade on update cascade,
sender_id int references Customer(customer_id) ON DELETE cascade on update cascade,
message varchar(200),
date timestamp
);


