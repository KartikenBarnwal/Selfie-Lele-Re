const express = require('express')
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

//data being sent to server side from the webpage
app.post('/api',(req,res)=>{
    console.log(req.body)
    const {lat,lon} = req.body
    // res.json({
    //     latitude:lat,
    //     longitude:lon
    // })
    const data = JSON.stringify(req.body)
    
    fs.appendFileSync('data.txt',data+"\n")
})

app.get('/about',(req,res)=>{
    res.render(('about'),{
        title:"Selfie Lele Re",
        designer:"Kartiken Barnwal"
    })
})

app.get('/selfie',(req,res)=>{
    res.send("Selfie Page")
})

const port = process.env.PORT || 3000
app.listen(3000,()=>{
    console.log("Listening on port "+port)
})
