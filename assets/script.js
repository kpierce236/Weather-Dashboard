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

 var currentUrl= "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat="+lat+"&lon="+lon+"&appid="+APIkey;
 var fiveDayUrl= "https://api.openweathermap.org/data/3.0/onecall?units=imperial&lat="+lat+"&lon="+lon+"&appid="+APIkey;

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
            displayFiveDays(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })


};

//display weather on top dashboard

var displayTopWeather = function (data) {
  $(".cityInfo").html("");
  var name = data.name;
  var temp = data.main.temp;
  var windSpeed = data.wind.speed;
  var humidity = data.main.humidity;
  //add date and wether emoji condtional
  var date = dayjs().format('M/D/YYYY');
  var icon = data.weather[0].icon;
  var iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
  

  var content = "<h1>"+name+" ("+date+")"+"<img src='"+iconUrl+"'></h1><p>Temp: "+temp+"&degF</p><p>Wind: "+windSpeed+" MPH</p><p>Humidity: "+humidity+"%</p>";
  $(".cityInfo").append(content);
}

var displayFiveDays = function (data) {
 $(".card-container").html("");
  for (var i = 1; i < 6; i++) {
    var date = dayjs.unix(data.daily[i].dt).format('M/D/YYYY');
    var temp = data.daily[i].temp.day;
    var windSpeed = data.daily[i].wind_speed;
    var humidity = data.daily[i].humidity;
    var icon = data.daily[i].weather[0].icon;
    var iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";

    var content = "<div class='card'><h2>"+date+"</h1><img src='"+iconUrl+"'><p>Temp: "+temp+"&degF</p><p>Wind: "+windSpeed+" MPH</p><p>Humidity: "+humidity+"%</p></div>";
    $(".card-container").append(content);

    console.log(date);
  }
}