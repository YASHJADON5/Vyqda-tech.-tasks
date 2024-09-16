const express= require('express');
const app= express();
const notes= require('./routes/index.js')
const cors= require('cors')


app.use(cors());

app.use(express.json());


app.use('/api/v1',notes);

const PORT= process.env.PORT || 5242;


app.listen(PORT,()=>{
    console.log('server is listening');
})

