var searchBtn =$('.searchBtn');
var APIkey = "ab74206522f65109633d42c234243129";

//fetch lat and long of city
var getCoords = function () {
    var city = $('input').val();
    console.log(encodeURIComponent(city));
    console.log(city);

    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+encodeURIComponent(city)+'&appid='+APIkey;

    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
    };

searchBtn.click(getCoords);
//fetch weather data 
