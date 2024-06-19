const express = require("express");
const router = express.Router();
const fs = require("fs")
const bodyParser = require("body-parser")
const path = require('path')
router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())
router.get('/user',(req,res) => {
    fs.readFile(__dirname + "/../" + "users.json","utf-8",(err,data) => {
        res.end(data);
    })
})

router.get('/user/:id',(req,res) => {
    fs.readFile(__dirname + "/../" + "users.json","utf-8",(err,data) => {
        var users = JSON.parse(data)
        var user = users["user" + req.params.id]
        res.end(JSON.stringify(user));
    });
});

router.post('/addUser',(req,res) => {
    fs.readFile(__dirname + "/../" + "users.json","utf-8",(err,data) => {
        var users = JSON.parse(data);
        var user = req.body.newuser;
        users["user"+user.id] = user;
        fs.writeFile('users.json',JSON.stringify(users),(err) => {
            if(err){
                console.log("ERROR : " + err );
            }else{
                console.log("Overwritting successfully");
            }
        })
    res.end(JSON.stringify(users))
    })
});

router.delete('/deleteUser/:id',(req,res) => {
    fs.readFile(__dirname + "/../" + "users.json","utf-8",(err,data) => {
        users = JSON.parse(data);
        var id = req.params.id;
        var user = "user"+id;
        delete users[user];
        fs.writeFile('users.json',JSON.stringify(users),(err) => {
            if(err){
                console.log("ERROR : " + err );
            }else{
                console.log("Overwritting successfully");
            }
        })
        res.end(JSON.stringify(users))
    })
})

router.put('/updateUser/:id',(req,res) => {
    fs.readFile(__dirname + '/../' + 'users.json',"utf-8",(err,data) => {
        var users = JSON.parse(data);
        var id = "user" + req.params.id;
        users[id] = req.body;
        fs.writeFile('users.json',JSON.stringify(users),(err) => {
            if(err){
                console.log("ERROR : " + err );
            }else{
                console.log("Overwritting successfully");
            }
        })
        res.end(JSON.stringify(users))
    })
})

module.exports = router;