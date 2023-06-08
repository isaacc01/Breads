// DEPENDENCIES
const express = require('express')
const app = express()

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
console.log(PORT)

// ROUTES
app.get('/', (req, res) =>{
  res.send('Welcome to an Awesome App about Breads')
})

//middleware
const breadController = require('./controllers/breads_controller.js')
app.use('/breads', breadController)
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

// 404 Page
app.get('*', (req, res) => {
  res.send('Not Found')
})


app.listen(PORT, ()=>(
    console.log('listening on port:', PORT)
))

