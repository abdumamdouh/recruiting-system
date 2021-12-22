const express = require('express')
const db = require('./db/db')

const app = express();
const PORT = 3000;

app.use(express.json()) 


db.sync().then( res => {
}).catch( error =>{
    // console.log(error)
}) 

app.listen(PORT , () =>{
    console.log('Server is up on port '+ PORT)
})
