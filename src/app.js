const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express configs
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setting up handlebar template engine & views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Vaibhav Parab'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'Vaibhav Parab'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        name: 'Vaibhav Parab',
        message: 'Help message will come here'
    })
})



app.get('/weather', (req,res)=>{

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode.geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error: error  //you can use shorthand here
            })
         }
         forecast.forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error: error}) //you can use shorthand here
            }
            res.send({
                forecast: forecastData,
                location: location, //shorthand
                address: req.query.address
            })

        })
    })
    
}) 



//All 404 custom pages get has to be at the end of all gets
app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Vaibhav Parab',
        errorMessage: 'Help pages not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Vaibhav Parab',
        errorMessage: 'Page Not Found'
    })
})
//Due to Index.html in public this call for root path doesnt server any purpose now
// app.get('', (req, res)=>{
//     res.send('Express Hello!')
// })

// app.get('/help', (req, res)=>{
//     res.send('Express Help!')
// })

// app.get('/about', (req, res)=>{
//     res.send('About Express!')
// })



//port
app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})