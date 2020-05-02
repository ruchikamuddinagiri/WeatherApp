const axios=require('axios')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?'
    var params = {
      access_token: 'pk.eyJ1IjoibXJ1Y2hpa2FyIiwiYSI6ImNrOTJmOXgwNTAxc2EzZ251bWxsd25weDUifQ.OVL-sXlZy5HcY3CLrGBUVg',
      limit:'1'
    }
    axios.get(url, {params})
          .then(response => {
              if(response.data.error){
                callback(response.data.error, undefined)
              }
              else if(!response.data.error){
                if(response.data.features.length === 0){
                  callback('Unable to find the location. Try again.', undefined)
                } else{
                  callback(undefined, {
                    latitude: response.data.features[0].center[1],
                    longitude: response.data.features[0].center[0],
                    location: response.data.features[0].place_name
                  }
                  )
                }
                
              } 
          })
          .catch(error => {
            if(!error.response){
              callback('Unable to connect to location services', undefined)
            }
            else{
              console.log(error.response.data.message)
              callback('Unable to search the location', undefined)
            }   
          })
}

module.exports = geocode