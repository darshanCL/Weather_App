apikey = "cff88eadfc6eb2342fd68adfaa22ee87"
const weatherData = document.getElementById("weatherdata")
const CityInput = document.getElementById("text-input")

const FormI = document.querySelector("form")
FormI.addEventListener("submit", (event) => {
    event.preventDefault()
    const Citystore = CityInput.value
    Cityfn(Citystore)
    console.log(Citystore)
})

async function Cityfn(Citystore) {
    try {
        const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Citystore}&appid=${apikey}&units=metric`)
        // console.log(Citystore)
        if(!result.ok)
            {
                throw new Error("network error")
            }
        const data = await result.json()
        console.log(data)
        const icn=data.weather[0].icon
        const tmp=Math.round(data.main.temp)
        const desc=data.weather[0].description 
        const details=[
            `Feels like: ${data.main.feels_like}`,
            `Humidity: ${data.main.humidity} %`,
            `Wind: ${data.wind.speed} m/s`
        ] 
        weatherData.querySelector(".icon").innerHTML=`<img src="http://openweathermap.org/img/wn/${icn}.png">`
        weatherData.querySelector(".temp").innerHTML=`${tmp}°C`
        weatherData.querySelector(".desc").textContent=desc
        weatherData.querySelector(".details").innerHTML=details.map((d)=>
        `<div>${d}</div>`).join("")
    } catch (error) {
        weatherData.querySelector(".icon").innerHTML=""
        weatherData.querySelector(".temp").innerHTML=""
        weatherData.querySelector(".desc").textContent="Please Enter vaild input"
        weatherData.querySelector(".details").innerHTML=""
    }

}