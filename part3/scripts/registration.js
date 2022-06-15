const nameInput = document.querySelector(`input[placeholder="Name"]`)
const nicknameInput = document.querySelector(`input[placeholder="Nickname"]`)
const surnameInput = document.querySelector(`input[placeholder="Surname"]`)
const emailInput = document.querySelector(`input[placeholder="Email"]`)
const phoneNumberInput = document.querySelector(`input[placeholder="Phone number"]`)
const dateInput = document.querySelector(`input[type="date"]`)
const ageInput = document.querySelector(`input[placeholder="Age"]`)
const countryInput = document.querySelector("#country")
const cityInput = document.querySelector(`#city`)
const passwordInput = document.querySelector(`input[type="password"]`)

const submitBtn = document.querySelector(`input[type="Submit"]`)



const SERVER_URL = "http://127.0.0.1:3000"
let countries;
let cities;
submitBtn.addEventListener("click",async (e)=>{
    const userData = {
        name:nameInput.value,
        surname:surnameInput.value,
        email:emailInput.value,
        nickname:nicknameInput.value,
        phoneNumber: phoneNumberInput.value,
        date:dateInput.value,
        age: ageInput.value,
        country:countryInput.value,
        city:cityInput.value,
        password:passwordInput.value

    }
   let res = await fetch(`${SERVER_URL}/register`,{
    method:"POST",
    body: JSON.stringify(userData), 
    headers: {
        'Content-Type': 'application/json'
    }
   }).then(res=>res.json())
   localStorage["user"] = JSON.stringify(userData);
   if(res.res){
       window.location.href="/profile"
   }
});
const renderCountries = ()=>{
    countries = countries.countries;
    countries.forEach(country=>{
        countryInput.innerHTML+=`
        <option value="${country.CountryID}">${country.CountryID}</option>`
    })

};
const renderCities = ()=>{
    console.log(cities)
    cityInput.innerHTML = ""
    cities.forEach(city=>{
        cityInput.innerHTML += `<option value="${city.Name}">${city.Name}</option>`
    })
}
countryInput.addEventListener("change",async (e)=>{
    cities =await fetch(`${SERVER_URL}/location/cities/${countryInput.value}`).then(res=>res.json()).then(json=>json.cities)
    renderCities()
});
(async ()=>{
    let countriesRes = await fetch(`${SERVER_URL}/location/countries`).then(res=>res.json());
    countries = countriesRes;
    renderCountries()
})()