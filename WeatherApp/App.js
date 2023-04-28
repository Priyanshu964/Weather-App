
//Set Timezone
const timeEl = document.getElementById("time")
const dateEl = document.getElementById("date")
const weather_status = document.getElementById("current_weather");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const status = document.getElementById("status");

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",]
const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",]
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();
    const hour = time.getHours();
    const min = time.getMinutes();
    const hourFormate = hour > 12 ? hour % 12 : hour;
    const ampm = hour >= 12 ? "PM" : "AM";
    const minzero = min < 10 ? "0" + min : min;

    timeEl.innerHTML = `${hourFormate < 10 ? "0" + hourFormate : hourFormate}:${minzero} <span id="am_pm">${ampm}</span>`
    dateEl.innerHTML = `${days[day]} ${date} ${months[month]}`
}, 10)

//API
const myAPI = "28dae00a7dcff3adbfa2be6d2c3d06da"

//making a function to get weather
async function getweather(city) {
    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPI}&units=metric`
    const response = await fetch(weatherApi)
    const data = await response.json()
    return showData(data);

}
//showing the data
function showData(data) {
    weather_status.innerHTML = `
    <div class="humidity item">
                <div>humidity</div>
                <div>${data.main.humidity}%</div>
            </div>
            <div class="pressure item">
               <div>Pressure</div>
                <div>${data.main.pressure}</div>
            </div>
            <div class="windSpeed item">
                <div>WindSpeed</div>
                <div>${data.wind.speed} Km/hr</div>
            </div>`;
    city.innerHTML = `${search.value}`
    temp.innerHTML = `${Math.round(data.main.temp)}&#176C`;


    const icon = document.getElementById("icon");
    if (data.weather[0].main == "Clear") {

        icon.innerHTML = `<img src="./clear.png" alt="weather">
        <div class="status" id="status">${data.weather[0].main}</div>
        `
    } else if (data.weather[0].main == "Clouds") {
        icon.innerHTML = `<img src="./clouds.png" alt="weather">
        <div class="status" id="status">${data.weather[0].main}</div>
        `
    } else if (data.weather[0].main == "Rain") {
        icon.innerHTML = `<img src="./rain.png" alt="weather">
        <div class="status" id="status">${data.weather[0].main}</div>
        `
    } else if (data.weather[0].main == "Drizzle") {
        icon.innerHTML = `<img src="./drizzle.png" alt="weather">
        <div class="status" id="status">${data.weather[0].main}</div>
        `
    } else if (data.weather[0].main == "Mist") {
        icon.innerHTML = `<img src="./mist.png" alt="weather">
        <div class="status" id="status">${data.weather[0].main}</div>
        `
    }
    console.log(data)

}

//searchBar
const search = document.getElementById("search")
const searchBtm = document.getElementById("btn").addEventListener("click",
    function (event) {
        getweather(search.value);
        event.preventDefault()
    }
) 