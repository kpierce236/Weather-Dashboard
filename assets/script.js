var searchVal = $('input').val();
var searchBtn =$('.searchBtn');
var APIkey = "1fa7fffbfafb577930d6b56f3508321";


//fetch lat and long of city
var getCoords = function () {
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+searchVal+'&appid='+APIkey;
  
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
