const request = require('postman-request')

const geocode = (address, callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidmFpYmhhdnBhcmFidCIsImEiOiJja3I0ZmFmMHgxMGUzMnBwdGJyYTN2c2d3In0.dGgedDy75_gUA49g9hXF9g'

    request({
        url: url, 
        json: true 
    }, (error, {body})=>{
        if(error){
            callback('Unable to connect to GeoCode service!', undefined)
        }
        else if(body.features.length == 0){
            
            callback('Unable to find geoCode', undefined)    
        }
        else{
            console.log(body.features[0])
            //callback(undefined, body.features)
            const data={
                latitude: body.features[0].center[1],
                longitude:  body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports ={
    geocode: geocode
}