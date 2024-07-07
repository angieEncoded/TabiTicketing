require('dotenv').config()
const express = require('express');
// const User = require('./models/User');
const Customer = require("./models/Customer")
const cors = require('cors');
const logger = require('./util/logger');
const app = express();


app.use(cors({
    origin: "http://localhost:3000"
}))

// Set up the folder where react will live
app.use(express.static('client'));

//The default endpoint for the webserver
app.get("/", (req, res) => {
    res.render('index.html');
});


app.get("/customers", async (req, res, next) => {
    const [customers] = await Customer.fetchAll();
    res.send(customers)
})

app.get("/users", async (req, res, next) => {
    const [users] = await Customer.fetchAll();
    res.send(users)
})



if (process.env.INDEV === "true") {
    app.listen(8080, function () {
        console.log(`http fired up on 8080`);
    });
} else {
    https.createServer(sslOptions, app).listen(process.env.PORT || 443, function () {
        console.log(`https fired up on ${process.env.PORT}`);
    });
    console.log("Fired up https")
}
