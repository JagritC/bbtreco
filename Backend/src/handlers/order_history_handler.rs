use sqlx::PgPool;
use actix_web::{web, HttpResponse, Responder};
use crate::models::order_history::OrderHistory;
use crate::db::db_functions;
use serde::{Serialize, Deserialize};

pub async fn create_order_history(pool: web::Data<PgPool>, order_history: web::Json<OrderHistory>) -> impl Responder {
    match db_functions::create_order_history(&pool, &order_history).await {
        Ok(_) => HttpResponse::Ok().body("Order history created successfully"),
        Err(e) => {
            eprintln!("Failed to create order history: {:?}", e);
            HttpResponse::InternalServerError().body("Failed to create order history")
        }
    }
}

pub async fn get_order_history(pool: web::Data<PgPool>, user_id: web::Data<i32>) -> impl Responder {
    match db_functions::read_order_history(&pool, &user_id).await {
        Ok(order_history) => HttpResponse::Ok().json(order_history),
        Err(e) => {
            eprintln!("Failed to get order history: {:?}", e);
            HttpResponse::InternalServerError().body("Failed to get order history")
        }
    }
}

pub async fn update_order_history(pool: web::Data<PgPool>, order_history: web::Json<OrderHistory>) -> impl Responder {
    match db_functions::update_order_history(&pool, &order_history).await {
        Ok(_) => HttpResponse::Ok().body("Order history updated successfully"),
        Err(e) => {
            eprintln!("Failed to update order history: {:?}", e);
            HttpResponse::InternalServerError().body("Failed to update order history")
        }
    }
}

