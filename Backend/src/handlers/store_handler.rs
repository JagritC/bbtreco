use actix_web::{web, HttpResponse, Responder};
use sqlx::PgPool;
use crate::models::store::Store;
use crate::db::db_functions;

pub async fn get_stores(pool: web::Data<PgPool>) -> impl Responder {
    match db_functions::get_stores(&pool).await {
        Ok(stores) => HttpResponse::Ok().json(stores),
        Err(e) => {
            eprintln!("Failed to get stores: {:?}", e);
            HttpResponse::InternalServerError().body("Failed to get stores")
        }
    }
}
