const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const locationBtn = document.querySelector("#location-button");

locationBtn.addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert("Your browser doesnot support Geolocation Feature")
    }
    navigator.geolocation.getCurrentPosition((position) =>{
        console.log(position)
        const {latitude , longitude} = position.coords

        fetch('/weather?latitude='+latitude+'&longitude='+longitude).then(response =>{
            response.json().then(data =>{
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
    })
})

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})