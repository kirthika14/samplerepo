const express = require('express')
const app= express()
const api=require('./api')
const  morgan=require('morgan')//logger useful when server crumbles
const bodyparser=require('body-parser')
const cors=require('cors')

app.set('port',(process.env.PORT || 8081))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

app.use(cors())
app.use('/api',api)
app.use(express.static('static'))

app.use(morgan('dev'))
app.use(function (req,res) {
    const err=new Error('Not Found');
    err.status=404
    res.json(err)
})

//mongodb connection

const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/virtualproduct',
{useNewUrlParser :true})//in mongodb on port 27017 virt.. is the db  creaated

//connection

const db=mongoose.connection
db.on('error',
console.error.bind(console,'connection error:'))
//on is an event
db.once('open',function(){
    console.log('connceted to MongoDb')
    app.listen(app.get('port'),function(){
        console.log('API Server listening on port' +
        app.get('port')+ '!')
    })
})
