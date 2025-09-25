import express from "express"
import pool from './config/db.js'
import dotenv from "dotenv"
import createItemTable from "./data/createTable.js"
import route from './routes/basketRoutes.js'
import cors from "cors"
import errorHandler from "./middlewares/errorHandler.js"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());


createItemTable()


app.use("/api", route);

app.use(errorHandler);

// Server running
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});