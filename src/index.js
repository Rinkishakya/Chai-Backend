import dotenv from "dotenv";
import connectDB from "./db/dbIndex.js";

dotenv.config({
    path: "./env"
});

connectDB()
.then(() => {
   app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
})
.catch(err => {
    console.log("Failed to connect to the database");
    
})








/*
import express from "express";
const app = express()

    (async () => {
        try {
            await mongoose.connect(`${process.env.MONGODB_URL} /${DB_NAME}`)
            // Start the Express server after successful DB connection
            app.on("error", (err) => {
                console.log("Express server error:", err);
                throw err
            });

            // Your Express server setup and routes go here
            app.listen(process.env.PORT, () => {
                console.log(`Server is running on port ${process.env.PORT}`);
            });

        } catch (error) {
            console.error("Error connecting to the database:", error);
            throw err
        }
    })() */

