const path = require('path')
const axios = require('axios')
const express = require('express') //module exports a function, not an object
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

//create the express application
const app = express() 
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')

//routing
//app.com = home page = get('', ....)
//app.com/help = help page = get('/help', ....) 

app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ruchika'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About me',
        name:'Ruchika'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ruchika',
        message: 'This is some helpful text'
    })
})

//weather page
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'No address provided'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location} = {})=>{
        if(error){
          return res.send({
              error: error
          }) 
        }
      
      forecast(latitude, longitude, (error, forecastData)=>{
        if(error){
          return res.send({
            error: error
        }) 
        }
        res.send({
            location: location,
            forecast: forecastData
        })
        })
      })

    
})
//help 404 page
app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: 'Weather App',
        name: 'Ruchika',
        message: 'Help article not found'
    })

})
//404 page
app.get('*', (req, res)=>{
    res.render('404', {
        title: 'Weather App',
        name: 'Ruchika',
        message:'The page that you are looking for was not found'
    })

})
//set up the server at port 3000
app.listen(port, () => {
    console.log('The server is up')
})
