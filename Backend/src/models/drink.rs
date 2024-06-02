use serde::{Serialize, Deserialize};


#[derive(Serialize, Deserialize)]
pub struct Drink {
    pub drink_id: i32,
    pub drink_name: String,
    pub store_id: i32,
    pub store_name: String,
    pub times_purchased: i32,
    pub rating: f32
}