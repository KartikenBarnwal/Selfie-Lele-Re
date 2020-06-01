const express = require('express')
const DataStore = require('nedb')
const hbs = require('hbs')
const path = require('path')
const fs = require('fs')

const app = express()

app.set('view engine', 'hbs')
app.set('views', 'public/views')
hbs.registerPartials('public/partials')

app.use(express.static('public'))
app.use(express.json({limit:'1mb'})) //recieved json data samajh paye hamara server 

app.get('',(req,res)=>{
    res.render('index',{
        title:"Selfie Lele Re",
        designer:"Kartiken Barnwal"
    })
})

const database = new DataStore({filename: 'database.db',autoload: true})

//data being sent to server side from the webpage
app.post('/api',(req,res)=>{
    const data = req.body
    data.timesStamp = {time: (new Date()).toLocaleTimeString(),
                        date: (new Date()).toDateString()}
    database.insert(data)
    // res.json(data)
})

app.get('/about',(req,res)=>{
    res.render(('about'),{
        title:"Selfie Lele Re",
        designer:"Kartiken Barnwal"
    })
})

app.get('/selfies',(req,res)=>{
    res.render(('selfies'))
})

app.get('/api',(req,res)=>{
    database.find({},(err,data)=>{
        if(err)
        {
            res.end()
            return
        }
        else
        {
            res.json(data)
        }

    })
    
})

const port = process.env.PORT || 3000
app.listen(3000,()=>{
    console.log("Listening on port "+port)
})
