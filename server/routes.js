const express = require('express');
const router = express.Router()
const {getConnectionStatus}=require('./db')
const {TestModel} = require('./schema.js')

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

router.get('/getPlayers/:id', (req, res) => {
    const id = req.params.id;
    TestModel.findById(id)
        .then(response => {
            console.log(response);
            res.json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});



router.post('/insert',async(req,res)=>{
    try{
        const newData =  await TestModel.create(req.body)
        res.send(req.body)
    }
    catch(err){
        console.error(err)
    }
})



module.exports = {router}
