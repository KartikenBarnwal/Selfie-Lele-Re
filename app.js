const express = require('express')
const hbs = require('hbs')
const path = require('path')

const app = express()

app.set('view engine', 'hbs')
app.set('views', 'public/views')
hbs.registerPartials('public/partials')

app.use(express.static('public'))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Selfie Lele Re",
        designer:"Kartiken Barnwal"
    })
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
