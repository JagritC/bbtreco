-- Add migration script here
create table "users" (
    user_id serial primary KEY,
    username varchar(255) not null,
    preferences varchar(255) not null
);