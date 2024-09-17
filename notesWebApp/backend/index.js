const express= require('express');
const app= express();
const user=require('./routes/user.js')
const notes= require('./routes/index.js')
const cors= require('cors')
require('dotenv').config();


app.use(cors());

app.use(express.json());


app.use('/api/v1',notes);
app.use('/api/v1',user);

const PORT= process.env.PORT || 5242;


app.listen(PORT,()=>{
    console.log('server is listening');
})

