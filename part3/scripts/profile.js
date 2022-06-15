
const user =  localStorage['user'] && JSON.parse(localStorage['user']);

console.log( document.querySelector("#user"));
const SERVER_URL = "http://127.0.0.1:3000";
let parsedData;

const renderUI = ()=>{
    console.log(parsedData)
    
    document.querySelector("#user-name").innerText = `Name: ${parsedData.user.First_Name} ${parsedData.user.Second_Name}`
    document.querySelector("#user-nickname").innerText = `Nickname: ${parsedData.user.Nickname}`
    document.querySelector("#user-email").innerText = `Email: ${parsedData.user.Email}`
    document.querySelector("#user-balance").innerText = `Balance: ${parsedData.user.Balance}$`
    document.querySelector("#user-phone").innerText = `Phone number: ${parsedData.user.Phone_number}`
    document.querySelector("#user-country").innerText = `Country: ${parsedData.user.location.Country}`
    document.querySelector("#user-city").innerText = `City: ${parsedData.user.location.City}`
};

(async ()=>{

    if(user.Email){
        try{

            parsedData = await fetch(`${SERVER_URL}/profile/${user.Email}`).then(data=>data.json())

            renderUI();
        }catch(err){
            console.error(err)
        }
    }
    else{
        window.location.href="login.html"
    }
})()