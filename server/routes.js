const express = require('express');
const router = express.Router()
const {getConnectionStatus}=require('./db')
const {TestModel} = require('./schema.js')
const {UserModel} = require('./userSchema.js')
const Joi = require('joi')

require('dotenv').config()

const jwt = require('jsonwebtoken')


const newPlayerSchema = Joi.object({
    "name": Joi.string().required(),
    "transferFee": Joi.string().required(),
    "year": Joi.number().required(),
    "from": Joi.string().required(),
    "to": Joi.string().required(),
    "img": Joi.string().required(),
    "created_by":Joi.string()
});


router.use(express.json());

router.get('/',async  (req, res) => {
    const finalStatus = await getConnectionStatus()
    res.send(finalStatus)
 });

router.get("/ping", (req, res) => {
    res.send('pong');

});

router.post("/post",(req,res)=>{
    console.log(req.body)
    res.json(req.body)
})

router.put('/put',async(req,res)=>{
    let finalStatus = await getConnectionStatus()
    finalStatus = "hey yall"
    res.send(finalStatus)
})


router.delete('/delete', async (req, res) => {
    
    res.send('Data deleted successfully');
});

router.get('/players',async(req,res)=>{
    try{
        const test = await TestModel.find({})
        console.log(test)
        res.send(test)
    }catch(err){
        console.log(err)
    }
})

router.get('/getPlayers/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const player = await TestModel.findById({_id:id});
        if (!player) {
            return res.status(404).json({ error: 'Player not found' });
        }
        console.log(player);
        res.json(player);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get

router.put('/updatePlayers/:id',(req,res)=>{
    const{value,error} = newPlayerSchema.validate(req.body)
    if(error){
        res.send(error.details)
        console.log(error)
    }
    const id = req.params.id
    TestModel.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        transferFee : req.body.transferFee,
        year : req.body.year,
        from : req.body.from,
        to : req.body.to,
        img : req.body.img
    })
    .then(res=>res.json(res))
    .catch(err=>res.json(err))
})



router.delete('/deletePlayers/:id', (req, res) => {
    const id = req.params.id;
    TestModel.findByIdAndDelete(id)
        .then(deletedPlayer => {
            res.json(deletedPlayer);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});



router.post('/insert', async (req, res) => {
    console.log(req.body)
    try {
        const { error, value } = newPlayerSchema.validate(req.body);
        if (error) {
            console.log(error);
            res.send(error.details);
        }
        
           
            const newData = await TestModel.create(req.body);
            res.send(newData); 
        
    } catch (err) {
        console.log(err);
    }
});

router.post('/signup',async(req,res)=>{
    try{
        const user = await UserModel.create({
            username:req.body.username,
            password:req.body.password
        })
        res.send(user)
    }catch(err){
        console.error(err)
    }
  
})
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username, password });
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        
        res.status(200).json({ user });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/logout',(req,res)=>{
    res.clearCookie('username')
    res.clearCookie('password')

    res.status(200).json({message:'Logout succesful'})
})


router.post('/auth', async(req,res) => {
    try{const {username,password} = req.body
    const user = {
        "username" : username,
        "password" : password
    }
    const ACCESS_TOKEN = jwt.sign(user,process.env.ACCESS_TOKEN)
    res.cookie('token',ACCESS_TOKEN,{maxAge:365*24*60*60*1000})
    res.json({"acsessToken" : ACCESS_TOKEN})
}catch(err){
    console.error(err)
    res.status(500).json({error:'Internal Server Error'})
}
})


module.exports = {router}
