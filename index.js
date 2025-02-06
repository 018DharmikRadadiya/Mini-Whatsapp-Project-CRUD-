const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const Chat = require('./models/chat.js');

main().then((res)=>{
    console.log("Connection Successfull");
}).catch((err)=>{
    console.log(err);
})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatapp');
}

//View All UsersChat
app.get('/chats', async (req,res)=>{
    let allData = await Chat.find({});
    res.render("home.ejs",{allData});
})

//add new
app.get('/chats/new',(req,res)=>{
    res.render("new.ejs");
})
//add new
app.post('/chats',(req,res)=>{
    let {from,to,msg} = req.body;
    console.log(from,to,msg)
    let newChat = new Chat({
        from : from,
        to : to,
        msg: msg,
        created_at : new Date()
    });
    newChat.save().then((result)=>{
        console.log("Insert Successfully");
    }).catch((err)=>{
        console.log("Something Wrong While Inserting Data");
    })
    res.redirect('/chats')
});

//delete
app.delete('/chats/:id',async (req,res)=>{
    let {id} = req.params;
    await Chat.findByIdAndDelete(id).then((result)=>{
        console.log("Deleted Successfully");
    }).catch((err)=>{
        console.log("Something happen to delete")
    })
    res.redirect('/chats');
})

//update
app.get('/chats/update/:id',async (req,res)=>{
    let {id} = req.params;
    let updateData = await Chat.findById(id);
    res.render("update.ejs",{updateData,id});
})

app.put('/chats/:id',async (req,res)=>{
    let {id} = req.params;
    let data = req.body.msg;
    await Chat.findByIdAndUpdate(id,{msg: data}, {new:true,runValidator :true});
    res.redirect('/chats');
})

app.use(express.static(path.join(__dirname,"public")));

app.set("views",path.join(__dirname,"/views"));
app.listen(8080,()=>{
    console.log("Listening on Port 8080");
})