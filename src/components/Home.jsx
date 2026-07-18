import { useState, useEffect } from "react";
import axios from "axios";
import Forecast from "./Forecast";

const Home = () => {
  const [city, setCity] = useState("Pokhara");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState([]);

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`,
      );

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`,
      );

      console.log("Forecast Data:", forecastRes.data.list);

      const currentTime = new Date();

      let entries = forecastRes.data.list.filter((one) => {
        return new Date(one.dt_txt) > currentTime;
      });

      const grouped = entries.reduce((group, entry) => {
        const date = entry.dt_txt.split(" ")[0];

        if (!group[date]) {
          group[date] = [];
        }

        group[date].push(entry);

        return group;
      }, {});

      setForecast(grouped);

      setWeather(res.data);
      setError("");
    } catch (error) {
      setError("City not found.");
      setWeather(null);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col px-4 py-10 sm:px-6">
      <h2 className="text-center text-lg font-semibold text-gray-600 sm:text-4xl">
        Search Weather by City
      </h2>
      <div className="mt-6 flex w-full max-w-3xl border border-gray-400 overflow-hidden rounded-2xl bg-white shadow-xl">
        <input
          type="text"
          className="
    h-14
    flex-1
    px-4
    text-xl
    text-gray-700
    outline-none
    font-semibold
  "
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              fetchWeather();
            }
          }}
        />

        <button
          type="button"
          className="
      h-14
      px-8
      bg-blue-500
      text-white
      font-semibold
      transition
      hover:bg-blue-600
      focus:outline-none
    "
          onClick={fetchWeather}
        >
          Search
        </button>
      </div>

      {error && (
        <div className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700 shadow-sm ring-1 ring-red-200">
          {error}
        </div>
      )}

      {weather && (
        <div className="mt-6 rounded-3xl bg-linear-to-br from-blue-500 to-cyan-400 p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-widest opacity-80">
                Current Weather
              </p>

              <h3 className="text-3xl font-bold">
                {weather.name}, {weather.sys.country}
              </h3>
            </div>

            <img
              className="h-24 w-24"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
            />
          </div>

          <div className="mt-4 flex items-center gap-4">
            <h1 className="text-6xl font-bold">
              {Math.round(weather.main.temp)}°C
            </h1>

            <div>
              <p className="text-xl capitalize">
                {weather.weather[0].description}
              </p>

              <p className="text-sm opacity-80">
                Feels like {Math.round(weather.main.feels_like)}°
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/12 p-4 backdrop-blur">
              <p className="text-sm opacity-80">Humidity</p>

              <p className="text-xl font-bold">{weather.main.humidity}%</p>
            </div>

            <div className="rounded-2xl bg-white/12 p-4 backdrop-blur">
              <p className="text-sm opacity-80">Wind</p>

              <p className="text-xl font-bold">{weather.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}

      {Object.entries(forecast)
        .slice(0, 5)
        .map(([date, entries]) => (
          <Forecast key={date} entries={entries} />
        ))}
    </div>
  );
};

export default Home;
