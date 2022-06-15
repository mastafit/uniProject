const user =  localStorage['user'] && JSON.parse(localStorage['user']);

const countryInput = document.querySelector("#countries")
const cityInput = document.querySelector(`#cities`)
const redirectBtn = document.querySelector("#forecast-redirect")


const SERVER_URL = `http://127.0.0.1:3000`
let countries;
let cities;
const renderCountries = ()=>{
    countries = countries.countries;
    countryInput.innerHTML = ""
    countries.forEach(country=>{
        countryInput.innerHTML+=`
        <option value="${country.CountryID}">${country.CountryID}</option>`
    })
}
const renderCities = ()=>{
    console.log(cities)
    cityInput.innerHTML = ""
    cities.forEach(city=>{
        cityInput.innerHTML += `<option value="${city.Name}">${city.Name}</option>`
    })
};
countryInput.addEventListener("change",async (e)=>{
    cities =await fetch(`${SERVER_URL}/location/cities/${countryInput.value}`).then(res=>res.json()).then(json=>json.cities)
    renderCities()
});
redirectBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    // console.log(`/weather.html/?name=${cityInput.value}`)
    window.location.href = `/weather.html?name=${cityInput.value}`
})
if(user){
    (async ()=>{
// fetch countries
let countriesRes = await fetch(`${SERVER_URL}/location/countries`).then(res=>res.json());
    countries = countriesRes;
    renderCountries()
    cities =await fetch(`${SERVER_URL}/location/cities/${countryInput.value}`).then(res=>res.json()).then(json=>json.cities)
    renderCities()
    })();
}
else{
    window.location.href="/login.html"
}