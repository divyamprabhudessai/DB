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

router.get('/getPlayers/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const player = await TestModel.findById(_id:id);
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
