import {getAllItemsService, createNewItemService,
    getItemByIdService,
    deleteItemByIdService,
    updateItemByIdService,
} from '../models/basketService.js'


const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({ status, message, data });
};

export const createNewItem = async(req, res) =>{
    const newItem = await createNewItemService(req.body)
    handleResponse(res, 201, "Item created successfully", newItem);

}

export const getAllItems = async(req, res) => {
    const items = await getAllItemsService()
    handleResponse(res, 200, "All Items Retrieved", items);
}

export const getItemById = async(req, res) => {
    const item = await getItemByIdService(req.params.id)
    if (item) {
        handleResponse(res, 200, "User fetched successfully", item);
    } else {
        handleResponse(res, 404, "User record not found!", item);
    }
}


export const deleteItemById = async (req, res, next) => {
  const item = await deleteItemByIdService(req.params.id);
  if (item) {
    handleResponse(res, 200, "User deleted successfully", item);
  } else {
    handleResponse(res, 404, "User record not found!", item);
  }
};


export const updateItemById = async (req, res, next) => {
    const updatedItem = await updateItemByIdService(req.params.id, req.body);
    console.log('Updated Item: ', updatedItem)
    if (updatedItem) {
        handleResponse(res, 200, "User deleted successfully", updatedItem);
    } else {
        handleResponse(res, 404, "User record not found!", updatedItem);
    }
}