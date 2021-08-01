const request = require('postman-request')


const forecast = (lat, lng, callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=429d567fd4565cd54dd54e0f962dc799&query='+lat+','+lng

    request(
        {url,//ES6 property shorthand
        json: true}, 
        (error, {body})=>{
            if(error){
                callback('Unable to connect wheater api', undefined)
            }else if(body.error){
                callback('Unable to find location', undefined)
            }
            else{
                // data = {
                //     temperature: response.body.current.temperature,
                //     feels_like: response.body.current.feelslike
                // }
                const data = 'It is '+ body.current.temperature + ' degrees outside. But fills like ' + body.current.feelslike +". Due to humidity " + body.current.humidity
                callback(undefined, data)
            }
        })
}


module.exports = {forecast: forecast}

