const axios = require('axios')
const forecast = (lat, lon, callback) =>{

    //make request
    const access_key = '072c563cb94539a7314182558a8284cf'
    const url ='http://api.weatherstack.com/current?access_key='+access_key+'&query='+lat+','+lon
    axios.get(url)  
         .then(response => {
            //error handling
            if(response.data.error){
                callback('Unable to search the weather.', undefined)
            }else if(!response.data.error){
                callback(undefined, response.data.current.weather_descriptions[0] 
                        + '. It is '+response.data.current.temperature + '°C'+
                        '. The rainfall is '+response.data.current.precip
                        +'%. Although, it does feel like '+ response.data.current.feelslike+'.')
                        
            }
         })
         .catch(error => {
             callback('Unable to connect to Weather services', undefined)
         })
}
module.exports = forecast