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

 var currenUrl= "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+APIkey;
 var fiveDayUrl= "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+APIkey;

 fetch(currenUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
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