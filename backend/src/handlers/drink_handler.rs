use actix_web::{web, HttpResponse, Responder};
use sqlx::PgPool;
use crate::models::drink::Drink;
use crate::db::db_functions;

pub async fn get_drinks_from_store(pool: web::Data<PgPool>, store_name: web::Path<String>) -> impl Responder {
    match db_functions::read_drinks_from_store(&pool, &store_name).await {
        Ok(drinks) => HttpResponse::Ok().json(drinks),
        Err(e) => {
            eprintln!("Failed to get drinks from store: {:?}", e);
            HttpResponse::InternalServerError().body("Failed to get drinks from store")
        }
    }
}