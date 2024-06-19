const express = require("express")
const app = express()
const path = require("path")
const bodyParser = require("body-parser")
const fs = require("fs")

const PORT = process.env.PORT || 3000
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
const routerUser = require('./router/user');
app.use('/users',routerUser);
app.set('view engine','pug');

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"index.html"))
})

app.get("/information",(req,res) => {
    res.render("index",{title: "A message",text: "This text is from the backend"})
})

app.get("/buy",(req,res) => {
    res.sendFile(path.join(__dirname,"buy.html"))
})

app.post("/buy_post",(req,res) => {
    response = {
        code:req.body.code,
        quantite:req.body.number
    }
    console.log(response);
    res.end(JSON.stringify(response))
})

app.get("/person",(req,res) => {
    response = {
        first_name:req.query.fname,
        last_name:req.query.lname
    };
    console.log(response);
    res.end(JSON.stringify(response));

})

app.listen(PORT,() => {
    console.log(`The server is running on ${PORT}`)
})