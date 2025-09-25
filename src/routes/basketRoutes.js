import express from "express"
import {getAllItems, 
    createNewItem,
    getItemById, 
    deleteItemById,
    updateItemById,
} from '../controllers/basketController.js'

const route = express.Router()

route.get('/basket/items', getAllItems)

route.post('/basket/items', createNewItem)

route.get('/basket/items/:id', getItemById)

route.delete('/basket/items/:id', deleteItemById)

route.patch('/basket/items/:id', updateItemById)

export default route