use sqlx::PgPool;
use crate::models::user::User;
use crate::models::order_history::OrderHistory;
use crate::models::drink::Drink;
use crate::models::store::Store;
use sqlx::Row;


pub async fn create_user(pool: &PgPool, user: &User) -> Result<(), sqlx::Error> {
    let query = "INSERT INTO users (id, username, preferences) VALUES ($1, $2, $3)";
    sqlx::query(query)
        .bind(&user.id)
        .bind(&user.username)
        .bind(&user.preferences)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn update_user(pool: &PgPool, user: &User) -> Result<(), sqlx::Error> {
    let query = "UPDATE users SET preferences = $1 WHERE id = $2";
    sqlx::query(query)
        .bind(&user.preferences)
        .bind(&user.id)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn read_user(pool: &PgPool, user_id: i32) -> Result<User, sqlx::Error> {
    let query = "SELECT * FROM users WHERE user_id = $1";
    let row = sqlx::query(query)
        .bind(user_id)
        .fetch_optional(pool)
        .await?;
    
    if let Some(row) = row {
        let user = User {
            id: row.get(0),
            username: row.get(1),
            preferences: row.get(2),
        };
        Ok(user)
    } else {
        Err(sqlx::Error::RowNotFound)
    }
}

pub async fn read_drinks_from_store(pool: &PgPool, store_name : &str) -> Result<Vec<Drink>, sqlx::Error> {
    let query = "SELECT * FROM drinks WHERE store_name = $1";
    let rows = sqlx::query(query)
        .bind(store_name)
        .fetch_all(pool)
        .await?;
    
    let drinks: Vec<Drink> = rows.iter().map(|row| {
        Drink {
            drink_id: row.get(0),
            drink_name: row.get(1),
            store_id: row.get(2),
            store_name: row.get(3),
            times_purchased: row.get(4),
            rating: row.get(5),
        }
    }).collect();
    Ok(drinks)
}

pub async fn create_order_history(pool: &PgPool, order_history: &OrderHistory) -> Result<(), sqlx::Error> {
    let query = "INSERT INTO order_history (user_id, prev_order) VALUES ($1, $2)";
    sqlx::query(query)
        .bind(&order_history.user_id)
        .bind(&order_history.prev_order)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn read_order_history(pool: &PgPool, user_id: &i32) -> Result<OrderHistory, sqlx::Error> {
    let query = "SELECT * FROM order_history WHERE user_id = $1";
    let row = sqlx::query(query)
        .bind(user_id)
        .fetch_one(pool)
        .await?;
    
    let order_history = OrderHistory {
        user_id: row.get("user_id"),
        prev_order: row.get("prev_order"),
    };
    Ok(order_history)
}

pub async fn update_order_history(pool: &PgPool, order_history: &OrderHistory) -> Result<(), sqlx::Error> {
    let query = "UPDATE order_history SET prev_order = $1 WHERE user_id = $2";
    sqlx::query(query)
        .bind(&order_history.prev_order)
        .bind(&order_history.user_id)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn get_stores(pool: &PgPool) -> Result<Vec<Store>, sqlx::Error> {
    let query = "SELECT * FROM stores";
    let rows = sqlx::query(query)
        .fetch_all(pool)
        .await?;
    
    let stores: Vec<Store> = rows.iter().map(|row| {
        Store {
            store_id: row.get(0),
            store_name: row.get(1),
            last_updated: row.get(2),
        }
    }).collect();
    Ok(stores)
}

 