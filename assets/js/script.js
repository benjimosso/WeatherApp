// api Data fetch
SearchButton = document.getElementById('Search-Button')
var ApiKey = '77b370b5644211bf342dd0e9469a0daf';
var InputText = document.getElementById('Search-box')

SearchButton.addEventListener('click', function(event) {
    event.preventDefault()
        //console.log(InputText.value)

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
        //return;
})

// get API OpenWeather
function getAPI(lat, lon) {

    // console.log(lat)
    // console.log(lon)

    city = InputText.value
        //console.log(city)
    var APiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${ApiKey}`


    var OneCallAPI = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${ApiKey}`


    fetch(OneCallAPI)
        .then(function(response) {
            if (response.ok) {
                //console.log(response)
                response.json().then(function(data) {
                    // console.log(data);
                    FiveDay(data)
                    currentDay(data, city)

                });
            } else {
                alert('Error' + response.statusText)
            }

        })
}



// function NarrowDown(data) {
//     // console.log(data.list)
//     var Datalist = data.list

//     for (let i = 0; i < Datalist.length; i += 8) {
//         //console.log(Datalist[i])
//         FiveDay.push(Datalist[i])
//     }
//     test(FiveDay)
// }

// var FiveDay = []

function FiveDay(data) {
    // console.log(FiveDay)
    var IconClass = $('.icon')
    var Temp = $('.Temperature')
    var Humidity = $('.Humidity')
    var Dates = $('.date-5')
        // FiveDay.forEach(element => {
    $(IconClass).each(function(i) {
        var iconurl = "http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png";
        $(this).attr('src', iconurl)
            //console.log(this)
    });
    $(Temp).each(function(i) {
        //console.log(FiveDay)
        this.innerText = data.daily[i].temp.day + ' F°'
        console.log(this)
    })

    $(Humidity).each(function(i) {
        this.innerText = data.daily[i].humidity + ' %'
    })

    $(Dates).each(function(i) {
        var dateString = moment.unix(data.daily[i].dt).format("MM/DD/YYYY");
        this.innerText = dateString
    })

}

function currentDay(data, city) {
    var CityDate = $('.CityDate')
    var currentTemp = $('.current-temp')
    var CurrentHum = $('.current-humidity')
    var CurrentWind = $('.current-wind')
    var CurrentUV = $('#current-UV')

    var dateString = moment.unix(data.current.dt).format("MM/DD/YYYY");

    var iconURL = "http://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png"
    $('.IconCurrent').attr('src', iconURL)


    CityDate[0].innerText = city + ' ' + dateString
    currentTemp[0].innerText = 'Temperature: ' + data.current.temp + ' F°';
    CurrentHum[0].innerText = 'Humidity: ' + data.current.humidity + ' %'
    CurrentWind[0].innerText = 'Wind Speed: ' + data.current.wind_speed + ' MPH'


    if (data.current.uvi < 5) {
        $(CurrentUV).addClass("success");
    } else if (data.current.uvi < 7) {
        $(CurrentUV).addClass("warning");
    } else {
        $(CurrentUV).addClass("danger");
    }

    CurrentUV[0].innerText = 'UV Index: ' + data.current.uvi
    console.log(CurrentUV)
}