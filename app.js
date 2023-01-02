const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

app.use(cors());

const port = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true 
});


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())


app.listen(port, ()=>{
    console.log(`connected to ${port}`)
})