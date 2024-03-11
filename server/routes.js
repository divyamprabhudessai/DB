const express = require('express');
const router = express.Router()
const {getConnectionStatus}=require('./db')
const {TestModel} = require('./schema.js')
const Joi = require('joi')

const newPlayerSchema = Joi.object({
    name: Joi.string().required(),
    transferFee: Joi.string().required(),
    year: Joi.number().required(),
    from: Joi.string().required(),
    to: Joi.string().required(),
    img: Joi.string().required()
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

router.put('/updatePlayers/:id',(req,res)=>{
    const id = req.params.id
    TestModel.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        transferFee : req.body.transferFee,
        year : req.body.year,
        from : req.body.from,
        to : req.body.to,
        img : req.body.to
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
    try {
        const { error, value } = newPlayerSchema.validate(req.body);
        if (error) {
            console.log(error);
            res.send(error.details);
        }

        const newData = await TestModel.create(value);
        res.send(newData); 
    } catch (err) {
        console.error(err);
    }
});



module.exports = {router}
