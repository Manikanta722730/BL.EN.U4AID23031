const express= require("express");
const cors = require("cors");
const notificationRoutes = require("./routes/notifications");

const app =express();
const PORT=5000;

app.use(cors());
app.use(express.json());

app.use((req,res,next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}
);

app.use("/api/notifications", notificationRoutes);
app.get("/", (req,res) => {
    res.send("Notification API is running");
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:5000`);
});