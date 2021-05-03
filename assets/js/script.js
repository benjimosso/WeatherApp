// api Data fetch
SearchButton = document.getElementById('Search-Button')
var ApiKey = '77b370b5644211bf342dd0e9469a0daf';
var InputText = document.getElementById('Search-box')
var CardMain = document.querySelector('#card')
var CardFiveDay = document.querySelector('#container')
var Welcome = document.querySelector('.Welcome')

CardFiveDay.style.display = 'none'
CardMain.style.display = 'none'

SearchButton.addEventListener('click', function(event) {
    event.preventDefault()
        // get API For Longitud And Latitude
    city = InputText.value
    var APIGeoCodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=afe07db0fcd7497f94e6af637a912ef0`;
    fetch(APIGeoCodeUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(dataLatLong) {
                    //console.log(dataLatLong)
                    const lat = dataLatLong.results[0].geometry.lat
                    const lon = dataLatLong.results[0].geometry.lng
                    getAPI(lat, lon)
                })
            }
        })
    Welcome.style.display = 'none'
})

// get API OpenWeather
function getAPI(lat, lon) {
    city = InputText.value
    var APiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${ApiKey}`


    var OneCallAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${ApiKey}`


    fetch(OneCallAPI)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    FiveDay(data)
                    currentDay(data, city)

                });
            } else {
                alert('Error' + response.statusText)
            }

        })

    CardFiveDay.style.display = 'flex'
    CardMain.style.display = 'inline-block'

}
// Five Day function, retreives the 5 day forecast.
function FiveDay(data) {
    var IconClass = $('.icon')
    var Temp = $('.Temperature')
    var Humidity = $('.Humidity')
    var Dates = $('.date-5')

    $(IconClass).each(function(i) {
        var iconurl = "https://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png";
        $(this).attr('src', iconurl)
    });
    $(Temp).each(function(i) {

        this.innerText = 'Temperature: ' + data.daily[i].temp.day + ' F°'
        console.log(this)
    })

    $(Humidity).each(function(i) {
        this.innerText = 'Humidity: ' + data.daily[i].humidity + ' %'
    })

    $(Dates).each(function(i) {
        var dateString = moment.unix(data.daily[i].dt).format("MM/DD/YYYY");
        this.innerText = dateString
    })

}
// Current day function, retreves today's data
function currentDay(data, city) {
    var CityDate = $('.CityDate')
    var currentTemp = $('.current-temp')
    var CurrentHum = $('.current-humidity')
    var CurrentWind = $('.current-wind')
    var CurrentUV = $('#current-UV')

    var dateString = moment.unix(data.current.dt).format("MM/DD/YYYY");

    var iconURL = "https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png"
    $('.IconCurrent').attr('src', iconURL)


    CityDate[0].innerText = city.toUpperCase() + ' ' + dateString
    currentTemp[0].innerText = 'Temperature: ' + data.current.temp + ' F°';
    CurrentHum[0].innerText = 'Humidity: ' + data.current.humidity + ' %'
    CurrentWind[0].innerText = 'Wind Speed: ' + data.current.wind_speed + ' MPH'


    if (data.current.uvi < 5) {
        $(CurrentUV).addClass("success");
        $(CurrentUV).removeClass("warning");
        $(CurrentUV).removeClass("danger");
    } else if (data.current.uvi < 7) {
        $(CurrentUV).addClass("warning");
        $(CurrentUV).removeClass("success");
        $(CurrentUV).removeClass("danger");
    } else {
        $(CurrentUV).addClass("danger");
        $(CurrentUV).removeClass("warning");
        $(CurrentUV).removeClass("success");
    }

    CurrentUV[0].innerText = 'UV Index: ' + data.current.uvi
    console.log(CurrentUV)
}