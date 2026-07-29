import { useState, useEffect } from "react";
import axios from "axios";
import { MapPin, Heart, X } from "lucide-react";
import Forecast from "./Forecast";

const Home = () => {
  const [city, setCity] = useState("Pokhara");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [cel, setCel] = useState(true);
  const [isUsingLocation, setIsUsingLocation] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("user-favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("user-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (city) => {
    if (favorites.includes(city)) {
      setFavorites(favorites.filter((id) => id !== city));
    } else {
      setFavorites([...favorites, city]);
    }
  };

  const fetchWeather = async (searchCity) => {
    const queryCity = searchCity || city;
    if (!queryCity && !location) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

      let weatherRes;
      let forecastRes;

      if (isUsingLocation && location) {
        weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`,
        );

        forecastRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`,
        );
      } else {
        weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&units=metric&appid=${apiKey}`,
        );

        forecastRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${queryCity}&units=metric&appid=${apiKey}`,
        );
      }

      const currentTime = new Date();

      const entries = forecastRes.data.list.filter((one) => {
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
      setWeather(weatherRes.data);
      setError("");
    } catch (error) {
      setError("City not found.");
      setWeather(null);
      console.log(error);
    }
  };

  const handleFavClick = (fav) => {
    setCity(fav);
    setIsUsingLocation(false);
    setLocation(null);
    fetchWeather(fav);
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setLocation(loc);
        setCity("");
        setIsUsingLocation(true);
        setError("");
      },

      (err) => {
        setError(err.message);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);

    if (isUsingLocation) {
      setIsUsingLocation(false);
      setLocation(null);
    }
  };

  const handleSearch = () => {
    setIsUsingLocation(false);
    setLocation(null);
    fetchWeather();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      setIsUsingLocation(false);
      setLocation(null);
      fetchWeather();
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    if (location && isUsingLocation) {
      fetchWeather();
    }
  }, [location, isUsingLocation]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col px-4 py-10 sm:px-6">
      <h2 className="text-center text-lg font-semibold text-gray-600 sm:text-4xl">
        Search Weather by City
      </h2>

      <div className="mt-6 flex w-full max-w-3xl border border-gray-400 overflow-hidden rounded-2xl bg-white shadow-xl">
        <input
          type="text"
          className="h-14 flex-1 px-4 text-xl text-gray-700 outline-none font-semibold"
          placeholder={
            isUsingLocation ? "Using your location..." : "Enter city name..."
          }
          value={city}
          onChange={handleCityChange}
          onKeyDown={handleKeyDown}
        />

        <button
          type="button"
          className="h-14 px-8 bg-blue-500 text-white font-semibold transition hover:bg-blue-600"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={getLocation}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-emerald-600"
        >
          <MapPin className="h-5 w-5" />
          Get My Location
        </button>
      </div>

      {error && (
        <div className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {weather && (
        <div className="mt-6 flex flex-col gap-8 sm:flex-row">
          <div className="flex-3 rounded-3xl bg-linear-to-br from-blue-500 to-cyan-400 p-6 text-white shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm uppercase opacity-80">Current Weather</p>

                <h3 className="text-3xl font-bold">
                  {weather.name}, {weather.sys.country}
                </h3>
              </div>

              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => toggleFavorite(weather.name)}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  {favorites.includes(weather.name) ? (
                    <Heart color="#ff3b5c" size={36} fill="#ff3b5c" />
                  ) : (
                    <Heart color="#ffffff" size={36} />
                  )}
                </button>
                <img
                  className="h-24 w-24"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-6xl font-bold">
                    {cel
                      ? Math.round(weather.main.temp)
                      : ((weather.main.temp * 9) / 5 + 32).toFixed(2)}
                  </span>

                  <button
                    onClick={() => setCel(!cel)}
                    className="inline-flex items-center rounded-full bg-white border border-gray-400 overflow-hidden text-xl font-semibold"
                  >
                    <span
                      className={`px-4 py-2 transition-colors ${
                        cel
                          ? "bg-green-500 text-white"
                          : "bg-white text-gray-500"
                      }`}
                    >
                      °C
                    </span>

                    <span
                      className={`px-4 py-2 transition-colors ${
                        !cel
                          ? "bg-green-500 text-white"
                          : "bg-white text-gray-500"
                      }`}
                    >
                      °F
                    </span>
                  </button>
                </div>
                <div>
                  <p className="text-xl">
                    {weather.weather[0].description}
                  </p>

                  <p className="text-sm opacity-80">
                    Feels like {Math.round(weather.main.feels_like)}°
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/12 p-4">
                <p className="text-sm opacity-80">Humidity</p>

                <p className="text-xl font-bold">{weather.main.humidity}%</p>
              </div>

              <div className="rounded-2xl bg-white/12 p-4">
                <p className="text-sm opacity-80">Wind</p>

                <p className="text-xl font-bold">{weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>

          <div className="flex-1 text-center">
            <p className="mb-3 text-xl font-semibold uppercase tracking-widest text-black">
              Favorites
            </p>
            <ul className="flex flex-wrap justify-center gap-1">
              {favorites.length > 0 ? (
                favorites.map((fav) => (
                  <li
                    key={fav}
                    className="inline-flex items-center gap-2 px-3 py-1 text-md font-medium text-black"
                  >
                    <button onClick={() => handleFavClick(fav)}>{fav}</button>
                    <button
                      onClick={() => toggleFavorite(fav)}
                      className="cursor-pointer rounded-full bg-white/20 p-0.5 text-gray-500 hover:text-black transition-all hover:scale-110"
                    >
                      <X size={24} />
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-sm text-white/50">No favorites yet</li>
              )}
            </ul>
          </div>
        </div>
      )}

      {Object.entries(forecast).map(([date, entries]) => (
        <Forecast key={date} entries={entries} />
      ))}
    </div>
  );
};

export default Home;
