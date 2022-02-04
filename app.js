
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Dance_Academy_Data');
const port = 8000;

var contactschema = new mongoose.Schema({
    name: String,
    email:String,
    number:Number,
    gender:String,
    address:String
});

const contact = mongoose.model('contact', contactschema);


app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    res.status(200).render('home.pug');
})

app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug');
})


app.post('/contact',(req,res)=>{
    var myData= new contact(req.body);
    myData.save().then(()=>{
        res.send("Your from has been Submitted !!!!!");
    }).catch(()=>{
        res.status(404).send("There is Some Error in Submisson. Please Resubmit")
    })
})


app.listen(port,()=>{
    console.log(`The app is Running in the server http://localhost:${port}`);
})