const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const params = urlParams.getAll("name");

const cityName = urlParams.get("name");

const SERVER_URL = "http://127.0.0.1:3000";
let weather;
const renderWeather = ()=>{
    let split =weather.Station_Info.split("\n")
    let station = [split[0],split[2]].join("\n")
    document.querySelector("#continent").innerText = `Continent: ${weather.ContinentID}`
    document.querySelector("#country").innerText = `Country: ${weather.CountryID}`
    document.querySelector("#city").innerText = `City: ${weather.Name}`
    document.querySelector("#region").innerText = `Region: ${weather.RegionID}`
    document.querySelector("#climatic").innerText = `Climate: ${weather.ZoneID}`
    document.querySelector("#station").innerText = `Station \n${station}`
    document.querySelector("#time").innerText = `Time: ${new Date().toLocaleTimeString()}`
    document.querySelector("#temperature").innerText = `Temperature: ${weather.Temperature_value} Celsius`
    document.querySelector("#feelslike").innerText = `Feels Like: ${weather.Feels_like_temperature} Celsius`
    document.querySelector("#precipation").innerText = `Precipation: ${weather.Precipation_val} cm`
    document.querySelector("#pressure").innerText = `Pressure: ${weather.Pressure_val} hPa`
    document.querySelector("#wind").innerText = `Wind direction: ${weather.Wind_direction}`
    document.querySelector("#windspeed").innerText = `Wind Speed: ${weather.Wind_speed_value}`
    // document.querySelector("#station").innerText = `${weather.Station_Info.split("\n")[0]}`

//     ContinentID: "Europe"
// CountryID: "Poland"
// Day: "Friday"
// Duration: "00:00:24"
// Feels_like_temperature: 5
// ForecastID: 1
// GMT: "+3"
// Hour: 17
// Name: "Wroclaw"
// Precipation_val: 0
// Pressure_val: 1035
// RegionID: "Lower Silesia"
// Station_Info: "Name: WROCLAW I\nRegion: Dolnosląski\nOperating time: 5.5 years\n"
// Temperature_value: 4
// Type: "Wind"
// Wind_direction: "NE"
// Wind_speed_value: 18
// ZoneID: "Temperate Zone"
}

if (cityName) {
  (async () => {
    let res = await fetch(`${SERVER_URL}/weather/${cityName}`).then((res) =>
      res.json()
    );
    console.log(res);
    weather = res.weather[0];
renderWeather()
  })();
}
