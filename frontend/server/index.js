const express = require("express");
const app = express();
const dotenv = require("dotenv");
const database = require("./config/database");
const cookieParser = require("cookie-parser");

// const userRoutes = require("./routes/User");
const collisionRoutes = require("./routes/Collision");
const paymentRoutes = require("./routes/Payment");
const helmetRoutes = require("./routes/Helmet");
const emergencyRoutes = require("./routes/Emergency");


dotenv.config();
const PORT = process.env.PORT || 4000

database.connect();

// middlewares
app.use(express.json());
app.use(cookieParser());

// app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/collision", collisionRoutes);
app.use("/api/v1/helmet", helmetRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/emergency", emergencyRoutes);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "App started successfully!"
    });
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})