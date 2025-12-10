import mongoose from "mongoose";
import {DB_NAME} from "./constant";

import express from "express";
const app = express()

(async () => {
    try {
        await  mongoose.connect(`${process.env.MONGODB_URL} /${DB_NAME}`)
        // Start the Express server after successful DB connection
        app.on("error", (err) => {
            console.log("Express server error:", err);
            throw err
        });
        
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw err
    }
})()
