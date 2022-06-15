exports.getWeatherByCity = (cityName) => `
select f.ForecastID, f.Duration, w.Type, w.Wind_speed_value, w.Temperature_value, 
w.Feels_like_temperature, w.Precipation_val, w.Pressure_val,
w.Wind_direction,wt.Hour,wt.Day, Wt.GMT,
ws.Station_Info,
c.Name,
c.RegionID,
cr.CountryID,
cz.ZoneID,
cz.ContinentID
from forecast f 
inner join weather w on w.weatherID = f.WeatherID
inner join  weather_station ws on f.StationID = ws.StationID
inner join weather_time wt on w.WeatherTimeID = wt.WeatherTimeID
inner join forecast_city fc on fc.ForecastID = f.ForecastID
inner join city c on fc.CityID = c.CityID
inner join region r on c.RegionID = r.RegionID
inner join country cr on cr.CountryID = r.CountryID
inner join climatic_zone cz on cr.ZoneID = cz.ZoneID
where c.Name = "${cityName}"
`;
