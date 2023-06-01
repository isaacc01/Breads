// DEPENDENCIES
const express = require('express')
const app = express()

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
console.log(PORT)

//middleware
const breadController = require('./controllers/breads_controller.js')
app.use('/breads', breadController)

// ROUTES
app.get('/', (req, res) =>{
    res.send('Welcome to an Awesome App about Breads')
  })

app.listen(PORT, ()=>(
    console.log('listening on port:', PORT)
))

