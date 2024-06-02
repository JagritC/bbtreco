use actix_web::{web, HttpResponse, Responder};
use sqlx::PgPool;
use crate::models::user::User;
use crate::db::db_functions;

pub async fn create_user(pool: web::Data<PgPool>, user: web::Json<User>) -> impl Responder {
    match db_functions::create_user(&pool, &user).await {
        Ok(_) => HttpResponse::Ok().body("User created successfully"),
        Err(e) => {
            eprintln!("Failed to create user: {:?}", e);
            HttpResponse::InternalServerError().body("Failed to create user")
        }
    }
}

pub async fn get_user(pool: web::Data<PgPool>, user_id: web::Path<i32>) -> impl Responder {
    match db_functions::read_user(&pool, *user_id).await {
        Ok(user) => HttpResponse::Ok().json(user),
        Err(e) => {
            eprintln!("Failed to get user: {:?}", e);
            HttpResponse::InternalServerError().body("Failed to get user")
        }
    }
}

pub async fn update_user(pool: web::Data<PgPool>, user: web::Json<User>) -> impl Responder {
    match db_functions::update_user(&pool, &user).await {
        Ok(_) => HttpResponse::Ok().body("User updated successfully"),
        Err(e) => {
            eprintln!("Failed to update user: {:?}", e);
            HttpResponse::InternalServerError().body("Failed to update user")
        }
    }
}