// dependencies
const mongoose = require('mongoose')
const { Schema } = mongoose
const Bread = require('./bread')

// schema
const bakerSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
    }, 
    startDate: {
        type: Date,
        required: true
    },
    bio: String
}, {toJSON: {virtuals: true}})

//Virtuals
bakerSchema.virtual('breads', {
    ref: 'Bread',
    localField: '_id',
    foreignField: 'baker'
})

// hooks 
bakerSchema.post('findOneAndDelete', function() {
    Bread.deleteMany({ baker: this._conditions._id })
    .then(deleteStatus =>{
        console.log(deleteStatus)
    })
})            

// model and export
const Baker = mongoose.model('Baker', bakerSchema)
module.exports = Baker
//http://localhost:3003/bakers/data/seed


//"image": "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
//"image": "https://images.unsplash.com/photo-1614205569927-1f104e088eee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8MjE0ODgxOTF8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=420&q=60",