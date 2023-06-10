const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// INDEX
breads.get('/', (req, res) => {
  //res.send(Bread)
  res.render('Index',{
    breads: Bread
})
})

// NEW
breads.get('/new', (req, res) => {
  res.render('new')
})

// EDIT
breads.get('/:indexArray/edit', (req, res) => {
  res.render('edit', {
    bread: Bread[req.params.indexArray],
    index: req.params.indexArray
  })
})

// SHOW
breads.get('/:arrayIndex', (req,res)=>{
  if(Bread[req.params.arrayIndex]){
    res.render('Show' ,{
      bread: Bread[req.params.arrayIndex],
      index: req.params.arrayIndex,
    })
  }else{
    res.send('404')
  }
})

// DELETE
breads.delete('/:indexArray', (req, res) => {
  Bread.splice(req.params.indexArray, 1)
  res.status(303).redirect('/breads')
})

//CREATE
breads.post('/', express.urlencoded({ extended: true }), 
(req,res)=>{
//console.log(req.body)
if (!req.body.image){
  req.body.image = 'https://images.unsplash.com/photo-1614205569927-1f104e088eee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8MjE0ODgxOTF8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=420&q=60'
}
if (req.body.hasGluten === 'on') {
    req.body.hasGluten = 'true'
} else {
  req.body.hasGluten = 'false'
}
Bread.push(req.body)
res.redirect('/breads')
})

// UPDATE
breads.put('/:arrayIndex', 
express.urlencoded({ extended: true }),
(req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread[req.params.arrayIndex] = req.body
  res.redirect(`/breads/${req.params.arrayIndex}`)
})


module.exports = breads
