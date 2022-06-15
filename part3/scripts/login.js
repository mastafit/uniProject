const emailNicknameInput = document.querySelector("#nickname-input")
const passwordInput = document.querySelector("#password-input")
const formSubmit = document.querySelector('input[type="submit"]')

const SERVER_URL = "http://127.0.0.1:3000"


formSubmit.addEventListener("click", async (e)=>{
    console.log(emailNicknameInput.value)
    console.log(passwordInput.value)
    const data = {
        emailOrNickname: emailNicknameInput.value,
        password:passwordInput.value
    }
try{

    let res = await fetch(`${SERVER_URL}/login/`,{
        method:"POST",
        body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>res.json())
    localStorage["user"] = JSON.stringify(res.user)
    window.location.href="profile.html"
}
catch(err){
    console.error(err)
}
})