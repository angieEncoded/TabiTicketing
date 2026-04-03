const express = require("express");
const router = express.Router();


router.get("/", async (req, res, next) => {
    const [users] = await Customer.fetchAll();
    res.send(users)
})


module.exports = router;