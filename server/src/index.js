const express = require('express')
const db = require('./db/db')


const app = express();
const PORT = 3000;

app.use(express.json()) 


app.listen(PORT , () =>{
    console.log('Server is up on port '+ PORT)
})
