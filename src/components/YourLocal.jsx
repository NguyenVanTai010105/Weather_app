import "../components/YourLocal.css";
import Sun from "../assets/clear.png";
import Local from "../assets/local.png/";
import Humidity from "../assets/humidity.png";
import Clear from "../assets/clear.png";
import Clouds from "../assets/cloud.png";
import Rain from "../assets/rain.png";
import Drizzle from "../assets/drizzle.png";
import Snow from "../assets/snow.png";
import Temp from "../assets/temparature.png";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

export default function YourLocal() {
  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": Clear,
    "01n": Clear,
    "02d": Clouds,
    "02n": Clouds,
    "03d": Clouds,
    "03n": Clouds,
    "04d": Drizzle,
    "04n": Drizzle,
    "09d": Rain,
    "09n": Rain,
    "10d": Rain,
    "10n": Rain,
    "13d": Snow,
    "13n": Snow,
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const icon = allIcons[data.weather[0].icon] || Clear;

      setWeatherData({
        humidity: data.main.humidity,
        temp: Math.floor(data.main.temp),
        windSpeed: data.wind.speed,
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error("Fetch weather error: ", error);
    }
  };

  useEffect(() => {
    search(null);
  }, []);

  return (
    <>
      <SearchBar onSearch={search} />

      <div className="  weather-container flex w-full  mt-4 items-center justify-center">
        <div className="border-4 rounded-xl border-white shadow-xl  w-96 h-auto bg-gradient-to-r from-gray-500 to-gray-600">
          <div className="text-white font-mono p-4 font-bold flex items-center justify-center">
            Dự báo thời tiết
          </div>

          <div className="flex items-center justify-center">
            {weatherData && (
              <img
                src={weatherData.icon}
                alt="weather icon"
                className="w-28 h-28 ml-2"
              />
            )}
          </div>

          <div className="flex items-center justify-between px-10 mt-5">
            <img
              src={Temp}
              alt="weather icon"
              className="w-10 h-10 mr-2 p-1 shadow-lg bg-gradient-to-r from-blue-950 to-blue-500 rounded-full"
            />
            <p className="text-white font-mono text-2xl font-bold">
              Nhiệt độ: {weatherData?.temp} °C
            </p>
          </div>

          <div className="flex items-center justify-between px-10 mt-5">
            <img
              src={Humidity}
              alt="weather icon"
              className="w-10 h-10 p-1 mr-2 shadow-lg bg-gradient-to-r from-blue-950 to-blue-500 rounded-full "
            />
            <p className="text-white font-mono text-2xl font-bold mr-12">
              Độ ẩm: {weatherData?.humidity} %
            </p>
          </div>

          <div className="flex items-center pb-5 mt-5 justify-center">
            <img src={Local} alt="weather icon" className="w-8 h-8 mr-2" />
            <p className="text-white font-mono text-lg font-bold">
              {weatherData?.location}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
