import pool from '../config/db.js'

const createItemTable = async() => {
    const query = 
    `CREATE TABLE IF NOT EXISTS Grocery_Items (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      quantity INT NOT NULL,
      price INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
const client = await pool.connect()

try {
    await client.query(query);
} catch(error) {
    console.error("Error creating Table for Grocery Items")
} finally {
    client.release()
}


}




export default createItemTable;