create table stores (
    store_id serial primary key,
    store_name varchar(255) not null
);

create table "drinks" (
    drink_id serial primary KEY,
    drink_name varchar(255) not null,
    store_id integer not null references stores(store_id),
    store_name varchar(255) not null,
    times_purchased integer not null,
    rating decimal not null
);

create table order_history (
    order_id serial primary key,
    prev_orders varchar(255) not null,
    user_id integer not null references users(user_id)
);

