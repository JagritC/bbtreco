use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Store {
    pub store_id: i32,
    pub store_name: String,
    pub last_updated: String
}