import React from "react";

import search from "../asset/search.png"

import rain from "../asset/rain.png"
import clear from "../asset/clear.png"
import clouds from "../asset/clouds.png"
import drizzle from "../asset/drizzle.png"
import mist from "../asset/mist.png"
import snow from "../asset/snow.png"


import humidity from "../asset/humidity.png"
import wind from "../asset/wind.png"



export default function Weather(){
    let [city,setCity]=React.useState("");



    const apiKey="f72d357a1b793945dacde1be39c296fd";
    const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric"


    let [weather, setWeather]= React.useState({});
    let [pass, setPass]=React.useState(false);
    let [weatherDetail, setWeatherDetail]=React.useState(null)

    React.useEffect(()=>{
        fetch(`${apiUrl}&appid=${apiKey}&q=New York`)
        .then(res=> {
            if(!res.ok){
                setPass(false);

            }
            return res.json()})
            .then(data => {
                setWeather(data);
                
                })
            .catch(err=> {
                setPass(false);
                throw err});

    },[])
    async function apiCall(){
        fetch(`${apiUrl}&appid=${apiKey}&q=${city}`)
            .then(res=> {
                if(!res.ok){
                    setPass(false);
                    throw new Error(`${city} does not exist`);
                }
                return res.json()})
            .then(data => {
                setWeather(data);
                setPass(true);

                if(data.weather[0].main==="Mist"){
                    setWeatherDetail(mist);
                }
                else if(data.weather[0].main==="Clouds"){
                    setWeatherDetail(clouds);
                }
                else if(data.weather[0].main==="Drizzle"){
                    setWeatherDetail(drizzle);
                }
                else if(data.weather[0].main==="Clear"){
                    setWeatherDetail(clear);
                }
                else if(data.weather[0].main==="Rain"){
                    setWeatherDetail(rain);
                }
                else{
                    setWeatherDetail(snow);
                }
            
            
            
            })
            .catch(err=> {
                setPass(false);
                throw err
                });
    }



    function input_city(events){
        const newCity=events.target.value.toLowerCase();
        setCity(newCity);
    }
    
    

    return(
        <div>
            <div className="card">
                <div className="search">
                    <input type="text" placeholder="Enter City Name" spellCheck="false" onChange={input_city}/>
                    <button onClick={apiCall}><img src={search}/></button>
                </div>
            
                <div className="weather">
                    <img src={weatherDetail? weatherDetail: null} className="weather-icon"/>
                    {pass? <h1 className="temp">{Math.round(weather.main.temp).toString()}°C</h1> : <h1 className="temp">°C</h1>}
                    {pass? <h2 className="city">{weather.name}</h2> : <h2 className="city"></h2>}
                    <div className="details">
                        <div className="col">
                            <img src={humidity}/>
                            <div>
                                {pass? <p className="humidity">{weather.main.humidity}</p>: <p className="humidity"></p>}
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind}/>
                            <div>
                                {pass? <p className="wind">{weather.wind.speed} km/h</p> :<p className="wind">/h</p>}
                                <p>Wind Speed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}