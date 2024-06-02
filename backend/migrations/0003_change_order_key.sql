alter table order_history DROP COLUMN order_id;
alter table order_history ADD primary key (user_id);