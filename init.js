const mongoose = require('mongoose');
const Chat = require('./models/chat.js')

main().then((res)=>{
    console.log("Connection Successfull");
}).catch((err)=>{
    console.log(err);
})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatapp');
}

//insert
Chat.insertMany([
    {
        from:"Dharmik Radadiya",
        to:"Neel Gondaliya",
        msg:"Hello Brother need your Physics Book...",
        created_at: new Date(),
    },
    {
        from:"Mohit Chauhan",
        to:"Shreya Ghoshal",
        msg:"Good Morning Dear...",
        created_at: new Date(),
    },
    {
        from:"Jackiee Daa",
        to:"Salman Khan",
        msg:"Kya Bhiduuu.....",
        created_at: new Date(),
    },
    {
        from:"Mithun Daa",
        to:"Akshay Kumar",
        msg:"Bhai thode Paise dede...",
        created_at: new Date(),
    },
    {
        from:"Doremon(badshah)",
        to:"Honey Paji",
        msg:"Bhai plz help me revive my career...",
        created_at: new Date(),
    },

]).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
})
