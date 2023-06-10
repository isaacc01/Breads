// DEPENDENCIES
const express = require('express')
const app = express()
const methodOverride = require('methodOverride')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
console.log(PORT)

// ROUTES
app.get('/', (req,res)=>{
    es.send('Welcome to my Bread World!')
})

//middleware
const breadController = require('./controllers/breads_controller.js')
app.use(methodOverride('_method'))
app.use('/breads', breadController)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
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

