use sqlx::postgres::PgPool;
use std::env;
use dotenv::dotenv;
use actix_web::{web, App, HttpServer, HttpResponse, Responder};

mod models;
mod db;
mod handlers;
 

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok(); // This loads the variables from .env into the environment
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = PgPool::connect(&database_url).await.expect("Failed to connect to Postgres");
    
    let port = 8080;
    println!("Starting server at: http://127.0.0.1/8080");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .service(
                web::scope("/user")
                    .service(
                        web::resource("")
                            .route(web::post().to(handlers::user_handler::create_user))
                            .route(web::put().to(handlers::user_handler::update_user))
                    )
                    .service(
                        web::resource("/{user_id}")
                            .route(web::get().to(handlers::user_handler::get_user))
                    )
            )
            .service(
                web::scope("/drinks")
                    .service(
                        web::resource("/{store_name}")
                            .route(web::get().to(handlers::drink_handler::get_drinks_from_store))
                    )   
            )
            .service(
                web::scope("/store")
                    .service(
                        web::resource("")
                            .route(web::get().to(handlers::store_handler::get_stores))
                    )
            )
            .service(
                web::scope("/order_history")
                    .service(
                        web::resource("")
                            .route(web::post().to(handlers::order_history_handler::create_order_history))
                            .route(web::put().to(handlers::order_history_handler::update_order_history))
                    )
                    .service(
                        web::resource("/{user_id}")
                            .route(web::get().to(handlers::order_history_handler::get_order_history))
                    )
            )
        })
            .bind(("127.0.0.1", port))?
            .run()
            .await
}
