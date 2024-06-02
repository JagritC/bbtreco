use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct OrderHistory {
    pub user_id: i32,
    pub prev_order: String
}