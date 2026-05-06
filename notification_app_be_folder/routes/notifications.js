const express = require('express');
const router = express.Router();
router.get("/", (req, res) => {
    res.json({ message: "Welcome to the Notification API" });
});
res.json({
    success: true,
    message: "Notification API is working"  
});
router.post("/send", (req, res) => {
    const { title, message } = req.body;
    res.json({
        success: true,
        message: "Notification sent successfully",
        data: { title, message }
    });
});
module.exports = router;