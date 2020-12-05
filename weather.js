const API_KEY = "241051bf13976dd3ddf8b8d9f247255e"
const COORDS = 'coords'

const weather = document.querySelector(".js-weather")

function getWeather(lat, lon) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
        return response.json()
    })
    .then(function(json) {
        console.log(json)
        const temperature = json.main.temp
        const place = json.name
        weather.innerText = `${temperature} @ ${place}`
    })

}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSuccess(position) {
    console.log(position)
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const coordsObj = {
        // latitude: latitude,
        // 아래는 축약형
        latitude,
        // longtitude: longtitude
        // 아래는 축약형
        longitude
    }
    saveCoords(coordsObj)
    getWeather(latitude, longitude)
}

function handleGeoError() {
    console.log("Can't access geo location")
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS)
    if(loadedCoords === null) {
        askForCoords()
    } else {
        const parseCoords = JSON.parse(loadedCoords)
        getWeather(parseCoords.latitude, parseCoords.longitude)
    }
}

function init() {
    loadCoords()
}

init()