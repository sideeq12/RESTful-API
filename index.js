const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/wikiaDB", {useNewUrlParser : true, useUnifiedTopology : true})

let bodyschema = {
    title : "",
    message : ""
}

const Article = mongoose.model("Artcile", bodyschema)

app.get("/messages", (req, res)=>{
    Article.find({}, (err, foundResult)=>{
        if(!err){
            res.send(foundResult);
        }else{
            res.send(err);
            console.log(err)
        }
    })
})

//working with specific articles and repackaging the route


app.post("/articles/:userText", (req, res)=>{
    Article.findOne({title : req.params.userText}, function(err, result){
        if(result){
            res.send(result);
            console.log("result matched !")
        }else{
            res.send(err);
            console.log(req.params.userText)
        }
    })
})
app.listen(3000, ()=>{
    console.log("app running on port 3000")
})