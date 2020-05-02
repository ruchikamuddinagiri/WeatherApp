
const form = document.querySelector('form')
const input = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')

const apiFetch = function(address){
    const url = 'http://localhost:3000/weather?address='
    fetch(url+address).then((response) => {
    
    response.json().then((data)=>{

        if(data.error){
            console.log(data.error)
            msg1.textContent = ''
            msg2.textContent = data.error
        }
        else{
            console.log(data.forecast)
            console.log(data.location)
            msg1.textContent = data.location
            msg2.textContent = data.forecast
        }
        
    })
    
})

}



form.addEventListener('submit', (e)=>{
    e.preventDefault()
    apiFetch(input.value)
    msg1.textContent = 'Loading ...'
    msg2.textContent = ''
})