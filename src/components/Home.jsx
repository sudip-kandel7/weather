import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      setWeather(res.data);
      setError("");
    } catch (error) {
      setError("City not found.");
      setWeather(null);
      console.log(error);
    }
  };

  return (
    <div className="container main-container">
      <h2 className="text-center mb-4">Search Weather by City</h2>
      <div className="weather-form input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchWeather}>
          Search
        </button>
      </div>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {weather && (
        <div className="weather-card card mt-4 p-4 text-center">
          <h4>
            {weather.name}, {weather.sys.country}
          </h4>
          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
          <h5>{weather.main.temp}°C</h5>
          <p>{weather.weather[0].description}</p>
          <p>
            Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
