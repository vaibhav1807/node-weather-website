console.log('Client side javascript loaded!')



 const weatherForm = document.querySelector('form')
 const search = document.querySelector('input')

 const messageOne = document.querySelector('#message_1')
 const messageTwo = document.querySelector('#message_2')

 weatherForm.addEventListener('submit', (e)=>{
     e.preventDefault()
     const location = search.value

     messageOne.textContent = 'Fetching weather for location...'
     fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
                //console.log(data.error)
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            //console.log(data);
            }
        })
    })

     console.log(location)
 })