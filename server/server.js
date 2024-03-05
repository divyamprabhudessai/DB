const express = require('express');
const app = express();
const cors = require('cors')
const {router} = require('./routes')

const{startDatabase}=require('./db.js')


app.use(cors())

app.use(router);


app.listen(3200, () => {
    startDatabase();
    console.log('Server running on port 3200');
    
});

module.exports = app;
