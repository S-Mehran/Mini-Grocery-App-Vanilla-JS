import express from "express"
import pool from '../config/db.js'

export const getAllItemsService = async() => {
    const client = await pool.connect()
    try{
        const result = await client.query("SELECT * FROM Grocery_Items")
        console.log(result)
        return result.rows
    } catch(error) {
 console.error("Error fetching user:", error);
    throw error;
    } finally {
        client.release
    }
}

export const createNewItemService = async(itemData) =>{
    const client = await pool.connect()
    try{
        const {id, name, quantity, price} = itemData

        const result = await client.query(
            "INSERT INTO Grocery_Items (name, quantity, price) VALUES ($1, $2, $3) RETURNING *", 
            [name, quantity, price]
        )
        return result.rows[0]
    } catch(error) {
        console.error("Error creating item:", error);
        throw error;
    } finally {
        client.release()
    }
}


export const getItemByIdService = async(id) => {
    const client = await pool.connect()
    try{
        const result = await client.query(
            "SELECT * FROM Grocery_Items WHERE id=$1", [id,]
        )
        if (result.rowCount===1) {
            return result.rows[0]
        }else {
            return null;
        }
    } catch{
    console.error("Error fetching user:", error);
    throw error;
    } finally {
        client.release()
    }
}


export const deleteItemByIdService = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "DELETE FROM Grocery_Items WHERE id = $1 RETURNING *",
      [id]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  } finally {
    client.release();
  }
};



export const updateItemByIdService = async(id, newData) => {
    const client = await pool.connect()
    try{
        const {name, quantity, price} = newData;
        const result = await client.query(
            "UPDATE Grocery_Items SET name=$1, quantity=$2, price=$3 WHERE id=$4 RETURNING *", 
            [name, quantity, price, id,]
        )
        console.log('Update Results', result.rows[0])
        if (result.rows.length === 0) {
            throw new Error(`Item with ID ${id} not found.`);
        }
        
        return result.rows[0];

    } catch(error) {
        console.error("Error updating item:", error);
        throw error;
    } finally {
        client.release()
    }
}