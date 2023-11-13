var searchBtn =$('.searchBtn');
var APIkey = "ab74206522f65109633d42c234243129";


//fetch lat and long of city
var getCoords = function () {
    var city = $('input').val();

    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+encodeURIComponent(city)+'&appid='+APIkey;

    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            getCityWeather(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
    };

searchBtn.click(getCoords);
//fetch weather data 
var getCityWeather =  function (data) {
 var lat= data[0].lat;
 var lon = data[0].lon;

 var currentUrl= "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+APIkey;
 var fiveDayUrl= "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+APIkey;

 fetch(currentUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            displayTopWeather(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })

 fetch(fiveDayUrl)
      .then(function (response) {
        if(response.ok) {
          response.json().then(function (data) {
            console.log(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })


};

//display weather on top dashboard

var displayTopWeather = function (data) {
  var name = data.name;
  var tempK = data.main.temp;
  var tempF = ((tempK -273.15)*1.8)+32;
  var tempFround = tempF.toFixed(2);
  var windSpeed = data.wind.speed;
  var humidity = data.main.humidity;
  //add date and wether emoji condtional

  var content = "<h1>"+name+"</h1><p>Temp: "+tempFround+"&degF</p><p>Wind: "+windSpeed+" MPH</p><p>Humidity: "+humidity+"%</p>"
  $(".cityInfo").append(content);
}