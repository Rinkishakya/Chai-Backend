import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/dbIndex.js";
import userRouter from "./routes/user.routes.js";



// env config
dotenv.config({
    path: "./.env"
});

const app = express(); // importing app from app.js

//middlewares
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Server chal raha hai");
});


// ✅ ROUTES MOUNT (MOST IMPORTANT LINE)
app.use("/api/v1/users", userRouter);


// DB connect + server start
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to the database", err);
  });


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

