
const inputSearch = document.querySelector('#location');
const btnReset = document.querySelector('.request__btn');
const selected = document.querySelector('#selected');
const weather = document.querySelector('.weather');
const weatherDays = document.querySelector('.weather__days');
const API = "b2788065df31730f98f2cd2c5cfa8c64";

const getValue = id => document.getElementById(id).value; 
  
const getDay = date => {
    let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];;
    return days[date.getDay()];  
}

const removeDay = (selector) => {
    let days = document.querySelectorAll(selector);
    days.forEach((el) => el.remove(selector));
}
const weatherDetails = data => {
    if(data.cod == "404"){
        inputSearch.classList.add('border-red');
        const errorText = `${inputSearch.value} isn't a valid city name`;
        selected.innerHTML = errorText;
        selected.style.color = "red";
        
    }else{
        const city = data.city.name;
        const country = data.city.country;
        const {description,id} = data.list[0].weather[0];
        const {temp, feels_like} = data.list[0].main;
         
        document.querySelector('.weather__temp').innerHTML = `${Math.floor(temp- 273.15)}°C`;
        document.querySelector('.weather__type').innerHTML = description;
        document.querySelector('.weather__location').innerHTML = `${city}, ${country}`;
        document.querySelector('.weather__feel').innerHTML = `Feel like ${Math.floor(feels_like - 273.15)}°C`;
        document.querySelector('.weather__icon').innerHTML = `<i class="owf owf-${id} owf-4x"></i>`;

        const dayMilsec = 24 * 60 * 60 * 1000;
        const today = new Date().getTime();
        for (let i = 1; i < 6; i++) {
            let date = new Date(today + dayMilsec * i);
            let day =  `<span class="weather__day_name">${getDay(date)}</span>
                <div class="weather__icon_day"><i class = "owf owf-${data.list[i].weather[0].id} owf-3x"></i>
                <div class="weather__type_day">${data.list[i].weather[0].description}</div></div>
                <div>
                <div class="weather__temp_max">${Math.floor(data.list[i].main.temp_max - 273.15)}°C</div>
                <div class="weather__temp_min">${Math.floor(data.list[i].main.temp_min - 273.15)}°C</div>
                </div>`
            let li = document.createElement('li');
            li.innerHTML = day;
            li.classList.add('weather__day')     
            weatherDays.append(li);
        };
        
        weather.classList.add("active");

        inputSearch.classList.remove('border-red');
        selected.style.color = "black";
        selected.innerHTML = `${city}, ${country}`;

    }
}

btnReset.addEventListener('click', ()=> {
    selected.innerHTML = '';
    removeDay('.weather__day');
    weather.classList.remove("active"); 
});

inputSearch.addEventListener('change',()=>{
    const cityName = getValue('location');
    const url1 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API}`;
    fetch(url1)  
    .then(response => response.json())
    .then(result => weatherDetails(result))
});



